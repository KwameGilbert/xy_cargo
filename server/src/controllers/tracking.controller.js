import { successResponse } from '../utils/response.js';
import * as trackingService from '../services/tracking.service.js';

export const trackParcel = async (req, res) => {
  const { trackingNumber } = req.params;
  const tracking = await trackingService.getTrackingInfo(trackingNumber);
  successResponse(res, tracking);
};
