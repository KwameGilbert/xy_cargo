import { successResponse, createdResponse, noContentResponse } from '../utils/response.js';
import * as parcelService from '../services/parcel.service.js';

export const getAllParcels = async (req, res) => {
  const filters = req.query;
  const result = await parcelService.getAllParcels(filters);
  successResponse(res, result);
};

export const createParcel = async (req, res) => {
  const parcelData = req.body;
  const parcel = await parcelService.createParcel(parcelData);
  createdResponse(res, parcel);
};

export const getParcelById = async (req, res) => {
  const { id } = req.params;
  const parcel = await parcelService.getParcelById(id);
  successResponse(res, parcel);
};

export const updateParcel = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const parcel = await parcelService.updateParcel(id, updates);
  successResponse(res, parcel);
};

export const deleteParcel = async (req, res) => {
  const { id } = req.params;
  await parcelService.deleteParcel(id);
  noContentResponse(res);
};

export const createClaim = async (req, res) => {
  const { id } = req.params;
  const claimData = req.body;
  const claim = await parcelService.createClaim(id, claimData);
  createdResponse(res, claim);
};

export const addTrackingEvent = async (req, res) => {
  const { id } = req.params;
  const eventData = req.body;
  const event = await parcelService.addTrackingEvent(id, eventData);
  createdResponse(res, event);
};
