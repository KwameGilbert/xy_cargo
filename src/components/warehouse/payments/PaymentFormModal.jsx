import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useToast } from '../../../contexts/ToastContext';
import { getClientByParcelIdOrTrackingNumber, createPayment } from '../../../services/warehouse/paymentService';
// NOTE: Assuming createPayment service function is available via import

const PaymentFormModal = ({ isOpen, onOpenChange, onPaymentRecorded }) => {
    const toast = useToast(); // Using alias to match your new code's intent
    const [formData, setFormData] = useState({
        parcelIdOrTrackingNumber: '', // CORRECTED: Matched to form input
        clientId: '', // Will be auto-filled
        amount: '',   // Will be auto-filled and disabled
        paymentMethod: 'cash',
        status: 'completed'
    });
    const [clientInfo, setClientInfo] = useState(null);
    const [parcelInfo, setParcelInfo] = useState(null);
    const [isLoadingClient, setIsLoadingClient] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Debounce logic for parcel ID input
    useEffect(() => {
        // Clear info if input is empty
        if (!formData.parcelIdOrTrackingNumber) {
            setClientInfo(null);
            setParcelInfo(null);
            setFormData(prev => ({ ...prev, clientId: '', amount: '' }));
            return;
        }

        // Set a timer to fetch info after 3 seconds
        const delayDebounceFn = setTimeout(() => {
            fetchClientInfo(formData.parcelIdOrTrackingNumber);
        }, 3000); // 3-second delay

        // Cleanup function to clear the timer
        return () => clearTimeout(delayDebounceFn);
    }, [formData.parcelIdOrTrackingNumber]); // Only run when this value changes

    // Reset state when the modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                parcelIdOrTrackingNumber: '', // CORRECTED: Matched to form input
                clientId: '', 
                amount: '', 
                paymentMethod: 'cash', 
                status: 'completed'
            });
            setClientInfo(null);
            setParcelInfo(null);
            setIsLoadingClient(false);
            setIsSubmitting(false);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // REMOVED: Fetch logic is now handled by the debounced useEffect
    };

    const fetchClientInfo = async (parcelIdOrTrackingNumber) => {
        if (!parcelIdOrTrackingNumber) return;

        setIsLoadingClient(true);
        setClientInfo(null);
        setParcelInfo(null);
        
        try {
            // CORRECTED: Passed the correct variable to the API call
            const result = await getClientByParcelIdOrTrackingNumber(parcelIdOrTrackingNumber);

            if (result.status === 'success' && result.client && result.parcel) {
                const { client, parcel } = result;

                setClientInfo(client);
                setParcelInfo(parcel);
                
                // Auto-fill Client ID and Amount
                setFormData(prev => ({ 
                    ...prev, 
                    clientId: client.client_id.toString(),
                    amount: parseFloat(parcel.shipping_cost).toString()
                }));
                toast.success('Client and parcel information loaded.');
            } else {
                toast.error('Could not find client/parcel information for this ID.');
                setFormData(prev => ({ ...prev, clientId: '', amount: '' }));
            }
        } catch (error) {
            toast.error('Error fetching client information.');
            setFormData(prev => ({ ...prev, clientId: '', amount: '' }));
        } finally {
            setIsLoadingClient(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const dataToSend = {
            // CORRECTED: 'parcel_id' now comes from the fetched 'parcelInfo' state
            parcel_id: parcelInfo?.id, 
            client_id: parseInt(formData.clientId, 10),
            amount: parseFloat(formData.amount),
            payment_method: formData.paymentMethod,
            status: formData.status,
        };
        
        // CORRECTED: Validation now checks 'parcelInfo' and 'clientInfo'
        if (!clientInfo || !parcelInfo || isNaN(dataToSend.parcel_id) || isNaN(dataToSend.client_id) || isNaN(dataToSend.amount) || dataToSend.amount <= 0) {
            toast('error', 'Please ensure client info is loaded and all fields are valid.'); // CORRECTED: Using toast function
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await createPayment(dataToSend);
            
            if (result.success) {
                toast('success', 'Payment recorded successfully!'); // CORRECTED: Using toast function
                onPaymentRecorded();
                onOpenChange(false);
            } else {
                toast('error', result.message || 'Failed to record payment.'); // CORRECTED: Using toast function
            }
        } catch (error) {
            toast('error', 'Network error while recording payment.'); // CORRECTED: Using toast function
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-50" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Record New Payment
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px]">
                        Enter transaction details for the new payment.
                    </Dialog.Description>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <fieldset className="flex flex-col gap-2">
                            <label className="text-[13px] font-medium" htmlFor="parcelIdOrTrackingNumber">Parcel ID / Tracking Number</label>
                            <input
                                id="parcelIdOrTrackingNumber"
                                name="parcelIdOrTrackingNumber"
                                type="text" // CORRECTED: Changed to 'text' for alphanumeric
                                required
                                value={formData.parcelIdOrTrackingNumber} // CORRECTED: Matched to state
                                onChange={handleChange}
                                className="inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-gray-900 shadow-[0_0_0_1px] shadow-gray-300 focus:shadow-[0_0_0_2px] focus:shadow-red-500 outline-none"
                            />
                        </fieldset>

                        {/* Client Information Display */}
                        {isLoadingClient && (
                            <div className="flex items-center justify-center h-10">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                            </div>
                        )}
                        
                        {clientInfo && (
                            <div className="bg-gray-50 p-4 rounded-md space-y-2 border border-green-200">
                                <h4 className="text-sm font-bold text-gray-800">Client & Parcel Details</h4>
                                <div className="text-sm space-y-1">
                                    {/* Updated to show individual fields */}
                                    <p><span className="text-gray-500 font-medium">Name:</span> {clientInfo.firstName || ''} {clientInfo.lastName || ''}</p>
                                    <p><span className="text-gray-500 font-medium">Email:</span> {clientInfo.email || 'N/A'}</p>
                                    <p><span className="text-gray-500 font-medium">Phone:</span> {clientInfo.phone || 'N/A'}</p>
                                      <p><span className="text-gray-500 font-medium">Parcel Info:</span> {parcelInfo.description || 'N/A'}</p>
                                    <p><span className="text-gray-500 font-medium">Declared Value:</span> <span className="text-green-600">${parseFloat(parcelInfo.declared_value).toFixed(2)}</span></p>
                                    <p><span className="text-gray-500 font-medium">Total Shipping Cost:</span> <span className="font-bold text-lg text-red-600">${parseFloat(parcelInfo.shipping_cost).toFixed(2)}</span></p>
                                </div>
                            </div>
                        )}

                        <fieldset className="flex flex-col gap-2">
                            <label className="text-[13px] font-medium" htmlFor="amount">Amount ($)</label>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                required
                                readOnly // Make non-editable
                                disabled={!clientInfo} // Disabled until info is fetched
                                value={formData.amount}
                                onChange={handleChange}
                                className="inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-gray-900 shadow-[0_0_0_1px] shadow-gray-300 focus:shadow-[0_0_0_2px] focus:shadow-red-500 outline-none disabled:bg-gray-100 disabled:text-gray-600"
                            />
                        </fieldset>

                        <fieldset className="flex flex-col gap-2">
                            <label className="text-[13px] font-medium" htmlFor="paymentMethod">Payment Method</label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-gray-900 shadow-[0_0_0_1px] shadow-gray-300 focus:shadow-[0_0_0_2px] focus:shadow-red-500 outline-none"
                            >
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="bank_transfer">Bank Transfer</option>
                                <option value="online">Online</option>
                            </select>
                        </fieldset>

                        <fieldset className="flex flex-col gap-2">
                            <label className="text-[13px] font-medium" htmlFor="status">Payment Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-gray-900 shadow-[0_0_0_1px] shadow-gray-300 focus:shadow-[0_0_0_2px] focus:shadow-red-500 outline-none"
                            >
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                            </select>
                        </fieldset>
                        
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                // Disabled if submitting, if client info hasn't loaded, or if amount is zero/invalid
                                disabled={isSubmitting || !clientInfo || parseFloat(formData.amount) <= 0}
                                className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium leading-none text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Recording...' : 'Record Payment'}
                            </button>
                        </div>
                    </form>

                    <Dialog.Close asChild>
                        <button
                            className="text-red-500 hover:bg-red-50 focus:shadow-red-700 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default PaymentFormModal;

