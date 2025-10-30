// src/services/warehouse/parcelService.js

import { getAuthHeader, getApiBaseUrl } from './authService';

// Centralized endpoints
const ENDPOINTS = {
    parcels: `${getApiBaseUrl()}/parcels`,
    parcelById: (id) => `${getApiBaseUrl()}/parcels/${id}`,
    parcelStatus: (id) => `${getApiBaseUrl()}/parcels/${id}/status`,
    parcelPaymentStatus: (id) => `${getApiBaseUrl()}/parcels/${id}/payment-status`,
    parcelWithItems: (id) => `${getApiBaseUrl()}/parcels/${id}/with-items`,
};

/**
 * Fetch all parcels
 * @returns {Promise<Object>} Parcels data or error
 */
export async function getAllParcels() {
    try {
        const res = await fetch(ENDPOINTS.parcels, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            },
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            return {
                success: false,
                message: data.message || "Failed to fetch parcels"
            };
        }

        return {
            success: true,
            data: transformParcelsData(data.parcels || [])
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Fetch parcel by ID
 * @param {number} parcelId - The parcel ID
 * @returns {Promise<Object>} Result object with parcel data or error
 */
export async function getParcelById(parcelId) {
    try {
        const res = await fetch(ENDPOINTS.parcelById(parcelId), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            },
        });

        const data = await res.json();

        // Ensure both network status and API status are successful, and the parcel object exists
        if (!res.ok || data.status !== 'success' || !data.parcel) {
            return {
                success: false,
                message: data.message || "Failed to fetch parcel"
            };
        }

        // Return the raw API response data
        return {
            success: true,
            data: data
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Fetch parcel with items by ID
 * @param {number} parcelId - The parcel ID
 * @returns {Promise<Object>} Parcel with items data or error
 */
export async function getParcelWithItems(parcelId) {
    try {
        const res = await fetch(ENDPOINTS.parcelWithItems(parcelId), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            },
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            return {
                success: false,
                message: data.message || "Failed to fetch parcel with items"
            };
        }

        return {
            success: true,
            data: transformParcelData(data.parcel)
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Update parcel status
 * @param {number} parcelId - The parcel ID
 * @param {string} status - The new status
 * @returns {Promise<Object>} Update result or error
 */
export async function updateParcelStatus(parcelId, status) {
    try {
        const res = await fetch(ENDPOINTS.parcelStatus(parcelId), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            },
            body: JSON.stringify({ status })
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            return {
                success: false,
                message: data.message || "Failed to update parcel status"
            };
        }

        return {
            success: true,
            message: data.message || "Parcel status updated successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Update parcel payment status
 * @param {number} parcelId - The parcel ID
 * @param {string} paymentStatus - The new payment status
 * @returns {Promise<Object>} Update result or error
 */
export async function updatePaymentStatus(parcelId, paymentStatus) {
    try {
        const res = await fetch(ENDPOINTS.parcelPaymentStatus(parcelId), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            },
            body: JSON.stringify({ payment_status: paymentStatus })
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            return {
                success: false,
                message: data.message || "Failed to update payment status"
            };
        }

        return {
            success: true,
            message: data.message || "Payment status updated successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Create a new parcel
 * @param {Object} parcelData - The parcel data
 * @returns {Promise<Object>} Creation result or error
 */
export async function createParcel(parcelData) {
    try {
        const res = await fetch(ENDPOINTS.parcels, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            },
            body: JSON.stringify(parcelData)
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            return {
                success: false,
                message: data.message || "Failed to create parcel"
            };
        }

        return {
            success: true,
            data: data.parcel,
            message: data.message || "Parcel created successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Update parcel
 * @param {number} parcelId - The parcel ID
 * @param {Object} parcelData - The updated parcel data
 * @returns {Promise<Object>} Update result or error
 */
export async function updateParcel(parcelId, parcelData) {
    try {
        const res = await fetch(ENDPOINTS.parcelById(parcelId), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            },
            body: JSON.stringify(parcelData)
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            return {
                success: false,
                message: data.message || "Failed to update parcel"
            };
        }

        return {
            success: true,
            message: data.message || "Parcel updated successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Delete parcel
 * @param {number} parcelId - The parcel ID
 * @returns {Promise<Object>} Deletion result or error
 */
export async function deleteParcel(parcelId) {
    try {
        const res = await fetch(ENDPOINTS.parcelById(parcelId), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            },
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            return {
                success: false,
                message: data.message || "Failed to delete parcel"
            };
        }

        return {
            success: true,
            message: data.message || "Parcel deleted successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Transform backend parcel data to match frontend expectations
 * @param {Object} parcel - Backend parcel object
 * @returns {Object} Transformed parcel object
 */
export function transformParcelData(parcel) {
    const client = parcel.client || {};
    // Ensure items is an array, defaulting to an empty array if not present
    const itemsArray = Array.isArray(parcel.items) ? parcel.items : [];

    // --- Helper Functions for Transformation ---
    const statusMap = {
        pending: 'Pending',
        in_transit: 'In Transit',
        at_destination: 'At Destination Warehouse',
        delivered: 'Delivered',
        delayed: 'Delayed',
        processing: 'Processing',
        in_warehouse: 'In Warehouse', // Added for tracking updates
        departed: 'Departed', // Added for tracking updates
    };
    const normalizedStatus = statusMap[`${parcel.status}`.toLowerCase()] || parcel.status || 'Pending';

    const paymentStatusMap = { unpaid: 'Unpaid', paid: 'Paid', pending: 'Pending' };
    const normalizedPaymentStatus = paymentStatusMap[`${parcel.payment_status}`.toLowerCase()] || parcel.payment_status || 'Unpaid';

    const formatCurrency = (val) => {
        const n = parseFloat(val);
        if (Number.isNaN(n)) return '$0.00'; // FIX: Default to $0.00 for currency
        return `$${n.toFixed(2)}`;
    };

    const formatItemDimensions = (item) => {
        // Handle dimensions that are either directly on the item or nested in an object
        const dims = item.dimensions || {};
        const l = dims.length || item.length || 0;
        const w = dims.width || item.width || 0;
        const h = dims.height || item.height || 0;
        return (l && w && h) ? `${parseFloat(l).toFixed(0)}cm x ${parseFloat(w).toFixed(0)}cm x ${parseFloat(h).toFixed(0)}cm` : 'N/A';
    };

    // Calculate total weight if not provided at the parcel level
    const totalWeight = (parcel.weight != null && !Number.isNaN(parseFloat(parcel.weight)))
        ? parseFloat(parcel.weight).toFixed(2) // Use parcel weight if available and valid
        : itemsArray.reduce((sum, it) => sum + (parseFloat(it.weight) || 0), 0).toFixed(2); // Calculate from items

    // --- Final Transformed Object ---
    return {
        // Basic properties (used by list and detail)
        id: parcel.parcel_id,
        trackingNumber: parcel.tracking_number,
        status: normalizedStatus,
        totalWeight: totalWeight,
        volume: parcel.dimensions || 'N/A', // Assuming parcel.dimensions is the "XcmxYcm..." string
        declaredValue: formatCurrency(parcel.declared_value),
        paymentStatus: normalizedPaymentStatus,

        // Customer Details (for detail page)
        customer: {
            name: client.fullName || (client.firstName && client.lastName ? `${client.firstName} ${client.lastName}` : 'Unknown Client'),
            phone: client.phone || 'N/A',
            email: client.email || 'N/A',
            address: client.address || '',
        },

        // Metrics (for detail page overview)
        metrics: {
            totalWeight: totalWeight,
            volume: parcel.dimensions || 'N/A',
            declaredValue: formatCurrency(parcel.declared_value),
            shippingCost: formatCurrency(parcel.shipping_cost),
            paymentStatus: normalizedPaymentStatus,
        },

        // Items List (for detail page table)
        itemsList: itemsArray.map((it) => ({
            name: it.name,
            quantity: it.quantity || 1,
            weight: parseFloat(it.weight || 0).toFixed(2),
            dimensions: formatItemDimensions(it),
            // Check for special_packaging or fragile flag
            specialPackaging: !!it.special_packaging || !!it.fragile,
        })),


        // Shipment Tracking (for detail page timeline)
        shipment: {
            id: parcel.shipment?.shipment_id,
            trackingNumber: parcel.shipment?.tracking_number,
            waybillNumber: parcel.shipment?.waybill_number,
            origin: parcel.shipment?.origin_country,
            destination: {
                country: parcel.shipment?.destination_country,
                cityId: parcel.shipment?.destination_city_id
            },
            dates: {
                departure: parcel.shipment?.departure_date ? new Date(parcel.shipment.departure_date).toLocaleString() : null,
                arrival: parcel.shipment?.arrival_date ? new Date(parcel.shipment.arrival_date).toLocaleString() : null,
                shipped: parcel.shipment?.shipped_at ? new Date(parcel.shipment.shipped_at).toLocaleString() : null,
                expectedDelivery: parcel.shipment?.expected_delivery ? new Date(parcel.shipment.expected_delivery).toLocaleString() : null,
                delivered: parcel.shipment?.delivered_at ? new Date(parcel.shipment.delivered_at).toLocaleString() : null
            },
            status: statusMap[`${parcel.shipment?.status}`.toLowerCase()] || parcel.shipment?.status || 'Pending',
            priority: parcel.shipment?.priority?.toUpperCase() || 'STANDARD',
            warehouseId: parcel.shipment?.warehouse_id,
            notes: parcel.shipment?.notes,
            // Enhanced tracking updates with better date formatting and status mapping
            tracking_updates: Array.isArray(parcel.shipment?.tracking_updates)
                ? parcel.shipment.tracking_updates
                    .map(update => ({
                        status: statusMap[`${update.status}`.toLowerCase()] || update.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                        location: update.location || 'Warehouse',
                        notes: update.notes || '',
                        updated_at: update.updated_at ? new Date(update.updated_at).toLocaleString() : null,
                        timestamp: update.updated_at // Keep raw timestamp for sorting
                    }))
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort newest first
                : []
        },

        // Other legacy properties (for list/other views)
        customerName: client.fullName || (client.firstName && client.lastName ? `${client.firstName} ${client.lastName}` : 'Unknown Client'),
        customerContact: client.phone || client.email || 'N/A',
        items: itemsArray.length,
        dateCreated: parcel.created_at ? new Date(parcel.created_at).toISOString().split('T')[0] : '',
        shippingCost: parcel.shipping_cost,
        notes: parcel.notes,
        tags: parcel.tags,
        updatedAt: parcel.updated_at,
        // (Timeline property removed as it seems redundant with shipment.tracking_updates)
    };
}

/**
 * Transform array of backend parcels to match frontend expectations
 * @param {Array} parcels - Array of backend parcel objects
 * @returns {Array} Array of transformed parcel objects
 */
export function transformParcelsData(parcels) {
    return parcels.map(transformParcelData);
}