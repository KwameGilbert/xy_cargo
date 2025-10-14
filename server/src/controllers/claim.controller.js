import { successResponse } from '../utils/response.js';
import * as claimService from '../services/claim.service.js';

export const getAllClaims = async (req, res) => {
  const filters = req.query;
  const result = await claimService.getAllClaims(filters);
  successResponse(res, result);
};

export const updateClaim = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const claim = await claimService.updateClaim(id, updates);
  successResponse(res, claim);
};
