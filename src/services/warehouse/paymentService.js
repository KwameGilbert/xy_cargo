import { getAuthHeader, getApiBaseUrl } from './authService';

// Centralized endpoints for warehouse staff payments
const ENDPOINTS = {
    payments: `${getApiBaseUrl()}/warehouse-staff/payments`,
    paymentById: (id) => `${getApiBaseUrl()}/warehouse-staff/payments/${id}`,
    paymentStatus: (id) => `${getApiBaseUrl()}/warehouse-staff/payments/${id}/status`,
    pendingPayments: `${getApiBaseUrl()}/warehouse-staff/payments/status/pending`,
    paymentsByInvoice: (invoiceId) => `${getApiBaseUrl()}/warehouse-staff/payments/invoice/${invoiceId}`,
};

/**
 * Get all payments with optional filters
 * @param {Object} params - Filter parameters (period, startDate, endDate)
 * @returns {Promise<Object>} Result object with payments data or error
 */
export async function getPayments(params = {}) {
    try {
        const { period, startDate, endDate } = params;
        let url = ENDPOINTS.payments;
        const queryParams = new URLSearchParams();

        if (period && period !== 'custom') {
            queryParams.append('period', period);
        } else if (startDate && endDate) {
            queryParams.append('start_date', startDate);
            queryParams.append('end_date', endDate);
        }

        const queryString = queryParams.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

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
        invoiceId: payment.invoice_id,
        amount: parseFloat(payment.amount || 0),
        status: statusMap[payment.status?.toLowerCase()] || payment.status || 'Pending',
        paymentMethod: payment.payment_method,
        customerName: payment.customer_name,
        paymentDate: payment.payment_date || payment.created_at,
        createdAt: payment.created_at,
        updatedAt: payment.updated_at,
        invoice: payment.invoice ? {
            id: payment.invoice.invoice_id,
            number: payment.invoice.invoice_number,
            description: payment.invoice.description,
            amount: parseFloat(payment.invoice.amount || 0),
            dueDate: payment.invoice.due_date
        } : null
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
