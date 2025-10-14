import { successResponse, createdResponse } from '../utils/response.js';
import * as paymentService from '../services/payment.service.js';

export const getAllPayments = async (req, res) => {
  const filters = req.query;
  const result = await paymentService.getAllPayments(filters);
  successResponse(res, result);
};

export const createPayment = async (req, res) => {
  const paymentData = req.body;
  const payment = await paymentService.createPayment(paymentData);
  createdResponse(res, payment);
};
