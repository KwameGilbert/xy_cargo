import { getAuthHeader, getApiBaseUrl } from './authService';

// Centralized endpoints for warehouse staff shipments
const ENDPOINTS = {
    shipmentsSummary: `${getApiBaseUrl()}/shipments/summary/warehouse`,
    shipmentDetail: (id) => `${getApiBaseUrl()}/warehouse-staff/shipments/${id}`,
    createShipment: `${getApiBaseUrl()}/warehouse-staff/shipments`,
    addTrackingUpdate: (shipmentId) => `${getApiBaseUrl()}/warehouse-staff/shipments/${shipmentId}/tracking`,
};

/**
 * Transform shipment data for frontend use
 * @param {Object} shipment - Backend shipment object
 * @returns {Object} Transformed shipment object
 */
function transformShipmentData(shipment) {
    // Split origin_destination into origin and destination when possible
    const route = shipment.origin_destination || '';
    const parts = route.split(/\s*→\s*|\s*->\s*|\s*-\s*>\s*/);
    const originCountry = (parts[0] || '').trim();
    const destinationCountry = (parts[1] || '').trim();

    // Humanize status (e.g. 'in_transit' -> 'In Transit')
    const humanStatus = (shipment.status || '').toString().replace(/_/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    return {
        id: shipment.shipment_id,
        trackingNumber: shipment.tracking_number,
        route: route,
        originCountry,
        destinationCountry,
        departureDate: shipment.departure_date || null,
        arrivalDate: shipment.arrival_date || null,
        totalParcels: shipment.total_parcels,
        totalWeight: shipment.total_weight_kg ? parseFloat(shipment.total_weight_kg).toFixed(2) : '0.00',
        totalVolume: shipment.total_volume || '',
        shippingCost: shipment.total_shipping_cost ? parseFloat(shipment.total_shipping_cost).toFixed(2) : '0.00',
        status: humanStatus || 'Pending',
        departureDate: shipment.departure_date || null,
        estimatedArrival: shipment.estimated_arrival || null,
        statusBadgeColor: getStatusColor(shipment.status)
    };
}


/**
 * Get status color for badge
 * @param {string} status - Shipment status
 * @returns {string} Color class for badge
 */
function getStatusColor(status) {
    const statusColors = {
        'pending': 'yellow',
        'in_transit': 'blue',
        'delivered': 'green',
        'cancelled': 'gray',
        'delayed': 'orange',
    };
    return statusColors[status] || 'gray';
}

/**
 * Get shipments summary
 * @returns {Promise<Object>} Result object with shipments data or error
 */
export async function getShipmentsSummary() {
    try {
        const res = await fetch(ENDPOINTS.shipmentsSummary, {
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
                message: data.message || "Failed to fetch shipments summary"
            };
        }

        return {
            success: true,
            data: (data.summary || []).map(transformShipmentData)
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Transform a detailed shipment response from the API into the shape UI expects
 * @param {Object} s - backend shipment detail
 */
function transformShipmentDetail(s) {
    const humanStatus = (s.status || '').toString().replace(/_/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    const parcels = (s.parcels || []).map(p => ({
        id: p.parcel_id,
        description: p.description,
        weight: p.weight,
        dimensions: p.dimensions,
        paymentStatus: (p.payment_status || '').toString().toLowerCase() === 'paid' ? 'Paid' : 'Unpaid',
        customerName: p.customer_name,
        customerContact: p.customer_contact,
        specialHandling: p.special_handling || false
    }));

    const timeline = (s.timeline || []).map(t => ({
        status: t.status,
        humanStatus: t.status ? t.status.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : t.status,
        location: t.location,
        updatedAt: t.updated_at,
        notes: t.notes || ''
    }));

    return {
        id: s.shipment_id,
        trackingNumber: s.tracking_number,
        status: humanStatus || 'Pending',
        carrier: s.carrier || 'N/A',
        originCountry: s.origin_country || s.originCountry || '',
        destinationCountry: s.destination_country || s.destinationCountry || '',
        departureDate: s.departure_date || null,
        arrivalDate: s.arrival_date || null,
        estimatedArrival: s.expected_delivery || s.estimated_arrival || null,
        notes: s.notes || '',
        totalParcels: s.total_parcels || s.parcels?.length || 0,
        totalWeight: s.total_weight || s.total_weight_kg || '0.00',
        totalShippingCost: s.total_shipping_cost || s.totalShippingCost || '0.00',
        parcels,
        timeline,
        statusBadgeColor: getStatusColor(s.status)
    };
}
/**
 * Get details for a single shipment by id
 * @param {number|string} id
 * @returns {Promise<Object>} { success: boolean, data: object|null, message?: string }
 */
export async function getShipmentDetail(id) {
    try {
        const url = ENDPOINTS.shipmentDetail(id);
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            }
        });

        const data = await res.json();

        if (!res.ok || !data) {
            return { success: false, message: data?.message || 'Failed to fetch shipment detail' };
        }

        // API may return the shipment under different keys; try `shipment` then `data` then raw
        const raw = data.shipment || data.data || data;

        return { success: true, data: transformShipmentDetail(raw) };
    } catch (error) {
        return { success: false, message: error.message || 'Network error occurred' };
    }
}

/**
 * Create a new shipment
 * @param {Object} shipmentData - Shipment data to create
 * @returns {Promise<Object>} { success: boolean, data: object|null, message?: string }
 */
export async function createShipment(shipmentData) {
    try {
        const res = await fetch(ENDPOINTS.createShipment, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify(shipmentData)
        });

        const data = await res.json();

        if (!res.ok || !data) {
            return { success: false, message: data?.message || 'Failed to create shipment' };
        }

        return { success: true, data: data.shipment || data };
    } catch (error) {
        return { success: false, message: error.message || 'Network error occurred' };
    }
}

/**
 * Add a tracking update to a shipment
 * @param {number|string} shipmentId - Shipment ID
 * @param {Object} trackingData - Tracking update data { status, location, notes }
 * @returns {Promise<Object>} { success: boolean, data: object|null, message?: string }
 */
export async function addTrackingUpdate(shipmentId, trackingData) {
    try {
        const res = await fetch(ENDPOINTS.addTrackingUpdate(shipmentId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify(trackingData)
        });

        const data = await res.json();

        if (!res.ok || !data) {
            return { success: false, message: data?.message || 'Failed to add tracking update' };
        }

        return { success: true, data: data.tracking_update || data };
    } catch (error) {
        return { success: false, message: error.message || 'Network error occurred' };
    }
}