import { successResponse, createdResponse } from '../utils/response.js';
import * as invoiceService from '../services/invoice.service.js';

export const getAllInvoices = async (req, res) => {
  const filters = req.query;
  const result = await invoiceService.getAllInvoices(filters);
  successResponse(res, result);
};

export const getInvoiceById = async (req, res) => {
  const { id } = req.params;
  const invoice = await invoiceService.getInvoiceById(id);
  successResponse(res, invoice);
};

export const createInvoice = async (req, res) => {
  const invoiceData = req.body;
  const invoice = await invoiceService.createInvoice(invoiceData);
  createdResponse(res, invoice);
};
