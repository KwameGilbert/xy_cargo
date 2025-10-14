import { successResponse, createdResponse } from '../utils/response.js';
import * as warehouseService from '../services/warehouse.service.js';

export const getAllWarehouses = async (req, res) => {
  const warehouses = await warehouseService.getAllWarehouses();
  successResponse(res, warehouses);
};

export const createWarehouse = async (req, res) => {
  const warehouseData = req.body;
  const warehouse = await warehouseService.createWarehouse(warehouseData);
  createdResponse(res, warehouse);
};

export const getWarehouseSettings = async (req, res) => {
  const { id } = req.params;
  const settings = await warehouseService.getWarehouseSettings(id);
  successResponse(res, { items: settings });
};

export const updateWarehouseSetting = async (req, res) => {
  const { id, key } = req.params;
  const { value } = req.body;
  const setting = await warehouseService.updateWarehouseSetting(id, key, value);
  successResponse(res, setting);
};
