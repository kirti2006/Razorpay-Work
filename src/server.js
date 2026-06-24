import createApp from './app.js';
import './config/env.config.js';
import logger from './logger/logger.js';
import { pool } from './config/db.config.js';

const start = async () => {
	// ensure DB connection
	try {
		await pool.connect();
		logger.info('Database connection successful');
	} catch (err) {
		logger.error(`Database connection failed: ${err?.message || err}`);
		throw err;
	}

	const app = createApp();

	const PORT = Number(process.env.PORT) || 7002; // hard requirement to start on 7002
	app.listen(PORT, () => {
		logger.info(`Server listening on port ${PORT}`);
	});
};

start().catch((err) => {
	logger.error(`Failed to start server: ${err?.message || err}`);
	process.exit(1);
});
