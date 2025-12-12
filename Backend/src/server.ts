import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route for DB connection
app.get('/db-status', (req, res) => {
	const state = mongoose.connection.readyState;
	// 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
	let status = 'unknown';
	if (state === 1) status = 'connected';
	else if (state === 2) status = 'connecting';
	else if (state === 0) status = 'disconnected';
	else if (state === 3) status = 'disconnecting';
	res.json({ database: status });
});

// Log DB status in terminal on startup
const logDbStatus = () => {
	const state = mongoose.connection.readyState;
	let status = 'unknown';
	if (state === 1) status = 'connected';
	else if (state === 2) status = 'connecting';
	else if (state === 0) status = 'disconnected';
	else if (state === 3) status = 'disconnecting';
	console.log(`Database status on startup: ${status}`);
};

app.get('/', (req, res) => {
	const state = mongoose.connection.readyState;
	let dbStatus = 'unknown';
	if (state === 1) dbStatus = 'connected';
	else if (state === 2) dbStatus = 'connecting';
	else if (state === 0) dbStatus = 'disconnected';
	else if (state === 3) dbStatus = 'disconnecting';
	res.send(`<h1>🚀 TypeScript + Express Server is Running!</h1><p>Database status: <b>${dbStatus}</b></p>`);
});

// Start server
const startServer = async () => {
	try {
		await connectDB();
		logDbStatus();
		app.listen(PORT, () => {
			const state = mongoose.connection.readyState;
			let dbStatus = 'unknown';
			if (state === 1) dbStatus = 'connected';
			else if (state === 2) dbStatus = 'connecting';
			else if (state === 0) dbStatus = 'disconnected';
			else if (state === 3) dbStatus = 'disconnecting';
			console.log(`🚀 Server running on http://localhost:${PORT} | Database: ${dbStatus}`);
		});
	} catch (error) {
		logDbStatus();
		console.error('❌ Database not connected. Server not started.');
		console.error('Failed to start server:', error);
		process.exit(1);
	}
};

startServer();
