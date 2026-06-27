import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import logger from './logger/logger.js';
import errorHandler from './middlewares/error.middleware.js';

import onboardingsRoutes from './app/onboardings/onboardings.routes.js';
import rolesRoutes from './app/roles/roles.routes.js';
import employeesRoutes from './app/employees/employees.routes.js';
import reimbursementsRoutes from './app/reimbursements/reimbursements.routes.js';

const createApp = () => {
	const app = express();

	app.use(cors({
		origin: function (origin, callback) {
			const allowedOrigins = [
				'http://127.0.0.1:5500',
				'http://localhost:5500',
				'http://localhost:3000',
				// Add your deployed Render frontend URL here once you have it, e.g.:
				// 'https://razorpay-frontend.onrender.com'
			];
			// Allow requests with no origin (like mobile apps or curl requests)
			if (!origin) return callback(null, true);
			
			if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
	}));
	app.use(helmet());
	app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
	app.use(express.json());
	app.use(cookieParser());

	app.get('/health', (req, res) => res.json({ success: true, message: 'OK' }));

	app.use('/rest/onboardings', onboardingsRoutes);
	app.use('/rest/roles', rolesRoutes);
	app.use('/rest/employees', employeesRoutes);
	app.use('/rest/reimbursements', reimbursementsRoutes);

	// error handler last
	app.use(errorHandler);

	return app;
};

export default createApp;
