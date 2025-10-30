import { getAuthHeader, getApiBaseUrl } from './authService';

// Centralized endpoints for warehouse staff payments
const ENDPOINTS = {
    payments: `${getApiBaseUrl()}/warehouse-staff/payments/data`,
    createPayment: `${getApiBaseUrl()}/warehouse-staff/payments`,
    paymentById: (id) => `${getApiBaseUrl()}/warehouse-staff/payments/${id}`,
    paymentStatus: (id) => `${getApiBaseUrl()}/warehouse-staff/payments/${id}/status`,
    pendingPayments: `${getApiBaseUrl()}/warehouse-staff/payments/status/pending`,
    clientByParcelId: (parcelId) => `${getApiBaseUrl()}/clients/client-info/parcels/${parcelId}`,
};

/**
 * Get all payments with optional filters
 * @returns {Promise<Object>} Result object with payments data or error
 */
export async function getPayments() {
    try {
        let url = ENDPOINTS.payments;
    
        const res = await fetch(url, {
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
                message: data.message || "Failed to fetch payments"
            };
        }

        return {
            success: true,
            data: transformPaymentsData(data)
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Get client information by parcel ID
 * @param {number} parcelId - The parcel ID
 * @returns {Promise<Object>} Result object with client data or error
 */
export async function getClientByParcelIdOrTrackingNumber(parcelIdOrTrackingNumber) {
    try {
        const res = await fetch(ENDPOINTS.clientByParcelId(parcelIdOrTrackingNumber ), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                status: 'error',
                message: "Failed to fetch client data"
            };
        }

        return data; // Return the raw response as it already has the correct structure
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}


/**
 * Get payment by ID
 * @param {number} paymentId - The payment ID
 * @returns {Promise<Object>} Result object with payment data or error
 */
export async function getPaymentById(paymentId) {
    try {
        const res = await fetch(ENDPOINTS.paymentById(paymentId), {
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
                message: data.message || "Failed to fetch payment"
            };
        }

        return {
            success: true,
            data: transformPaymentData(data.payment)
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Create payment
 * @param {Object} paymentData - The payment data
 * @returns {Promise<Object>} Result object with created payment data or error
 */
export async function createPayment(paymentData) {
    try {
        const res = await fetch(ENDPOINTS.createPayment, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            },
            body: JSON.stringify(paymentData)
        });

        const data = await res.json();

        if (!res.ok || data.status !== 'success') {
            return {
                success: false,
                message: data.message || "Failed to create payment"
            };
        }

        return {
            success: true,
            data: (data.payment)
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Update payment status
 * @param {number} paymentId - The payment ID
 * @param {string} status - The new status
 * @returns {Promise<Object>} Result object with updated payment data or error
 */
export async function updatePaymentStatus(paymentId, status) {
    try {
        const res = await fetch(ENDPOINTS.paymentStatus(paymentId), {
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
                message: data.message || "Failed to update payment status"
            };
        }

        return {
            success: true,
            data: transformPaymentData(data.payment)
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Network error occurred"
        };
    }
}

/**
 * Transform payment data for frontend use
 * @param {Object} payment - Backend payment object
 * @returns {Object} Transformed payment object
 */
function transformPaymentData(payment) {
    if (!payment) return null;

    const statusMap = {
        pending: 'Pending',
        completed: 'Completed',
        failed: 'Failed',
        cancelled: 'Cancelled'
    };

    return {
        id: payment.payment_id,
        parcelId: payment.parcel_id,
        amount: parseFloat(payment.amount || 0),
        status: statusMap[payment.status?.toLowerCase()] || payment.status || 'Pending',
        paymentMethod: payment.payment_method,
        customerName: payment.customer_name,
        paymentDate: payment.payment_date || payment.created_at,
        createdAt: payment.created_at,
        updatedAt: payment.updated_at,
    };
}

/**
 * Transform payments response data
 * @param {Object} data - Backend response data
 * @returns {Object} Transformed payments data with summary
 */
function transformPaymentsData(data) {
    return {
        payments: (data.payments || []).map(transformPaymentData).filter(Boolean),
        summary: {
            totalCollected: parseFloat(data.summary?.total_collected || 0),
            pendingPayment: parseFloat(data.summary?.pending_payment || 0),
            totalTransactions: parseInt(data.summary?.total_transactions || 0, 10)
        }
    };
}
