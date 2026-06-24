import logger from '../logger/logger.js';
import AppError from '../utils/AppError.js';
import { ApiErrorResponse } from '../utils/ApiErrorResponse.js';

export const errorHandler = (err, req, res, next) => {
	if (err && err.isOperational) {
		const status = err.statusCode || 400;
		const payload = { success: false, message: err.message };
		if (err.errors) payload.errors = err.errors;
		return res.status(status).json(payload);
	}

	logger.error(`Unhandled error: ${err?.stack || err}`);
	return res.status(500).json({ success: false, message: 'Internal Server Error' });
};

export default errorHandler;
