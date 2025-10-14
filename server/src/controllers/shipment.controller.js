import { successResponse, createdResponse } from '../utils/response.js';
import * as shipmentService from '../services/shipment.service.js';

export const getAllShipments = async (req, res) => {
  const filters = req.query;
  const result = await shipmentService.getAllShipments(filters);
  successResponse(res, result);
};

export const createShipment = async (req, res) => {
  const shipmentData = req.body;
  const shipment = await shipmentService.createShipment(shipmentData);
  createdResponse(res, shipment);
};

export const getShipmentById = async (req, res) => {
  const { id } = req.params;
  const shipment = await shipmentService.getShipmentById(id);
  successResponse(res, shipment);
};

export const updateShipment = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const shipment = await shipmentService.updateShipment(id, updates);
  successResponse(res, shipment);
};
