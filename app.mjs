"use strict";

import express from "express";
import { connect as mongooseConnect } from "mongoose";
import dotenvFlow from "dotenv-flow";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import athleteRoutes from "./routes/athlete.mjs";
import exerciceRoutes from "./routes/exercice.mjs";
import seanceRoutes from "./routes/seance.mjs";
import performanceRoutes from "./routes/performance.mjs";
import seedRoutes from "./routes/db.mjs";

dotenvFlow.config();
const app = express();

const port = process.env.PORT ?? 3000;

app.use(helmet()); // protection XSS
app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json()); // application/json

if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev")); // journalisation des requêtes
}

app.use(athleteRoutes);
app.use(exerciceRoutes);
app.use(seanceRoutes);
app.use(performanceRoutes);
app.use(seedRoutes);

/**
 * Gestionnaire d'erreurs
 */
app.use((error, _req, res, _next) => {
	console.log("Erreur:", error);
	
	// Gestion spécifique de l'erreur de duplication MongoDB (E11000)
	if (error.code === 11000 && error.keyPattern) {
		const field = Object.keys(error.keyPattern)[0];
		const value = error.keyValue[field];
		
		return res.status(409).json({
			message: `Une ressource avec ce ${field} existe déjà`,
			field: field,
			value: value
		});
	}
	
	// Gestion des erreurs CastError (ObjectId invalide)
	if (error.name === "CastError" && error.path === "_id") {
		return res.status(400).json({
			message: "ID invalide - doit être un ObjectId MongoDB valide"
		});
	}
	
	// Gestion spécifique des erreurs de validation Mongoose
	if (error.name === "ValidationError") {
		const errors = {};
		
		// Extraire chaque erreur de validation
		Object.keys(error.errors).forEach(field => {
			errors[field] = error.errors[field].message;
		});
		
		return res.status(422).json({
			message: "Erreurs de validation",
			errors: errors
		});
	}
	
	// Autres types d'erreurs
	const { message, data, name, statusCode } = error;
	const status = statusCode ?? 500;
	res.status(status).json({ message: message, data: data });
});

/**
 * Gestionnaire de 404
 */
app.use((_req, res, _next) => {
	res.status(404).json({ message: "Route ou ressource introuvable" });
});

/**
 * Connexion à MongoDB
 */
mongooseConnect(process.env.MONGODB_URI ?? "mongodb://localhost:27017/entrainement")
	.then(() => {
		console.log("Connexion à MongoDB réussie");
		app.listen(port, () => {
			console.log(`Serveur démarré sur le port ${port}`);
		});
	})
	.catch((error) => {
		console.error("Erreur de connexion à MongoDB:", error);
		process.exit(1);
	});

export default app;