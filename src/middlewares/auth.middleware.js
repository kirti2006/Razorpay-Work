import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import env from '../config/env.config.js';

export const auth = (req, res, next) => {
	const token = req.cookies?.auth || req.cookies?.token;
	if (!token) {
		throw new AppError('Authentication token missing', 401);
	}
	try {
		const decoded = jwt.verify(token, env.JWT_SECRET);
		req.user = decoded;
		return next();
	} catch (err) {
		throw new AppError('Invalid authentication token', 401);
	}
};

export default auth;
