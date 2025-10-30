import React, { useEffect, useState } from 'react';
import { Button } from '@radix-ui/themes';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';
import PaymentFormModal from '../../../components/warehouse/payments/PaymentFormModal';
import PaymentsTable from '../../../components/warehouse/payments/PaymentsTable';
import PaymentSummary from '../../../components/warehouse/payments/PaymentsSummary';
import { getPayments } from '../../../services/warehouse/paymentService';
import { useToast } from '../../../contexts/ToastContext';

const WarehousePaymentsPage = () => {
    const [data, setData] = useState({ payments: [], summary: {} });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toast = useToast();

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const result = await getPayments();
            
            if (result.success) {
                setData(result.data);
            } else {
                toast.error(result.message || 'Failed to fetch payments');
            }
        } catch (error) {
            toast.error('Error loading payments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handlePaymentRecorded = () => {
        fetchPayments();
    };

    if (loading) {
        return (
            <WarehouseLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
            </WarehouseLayout>
        );
    }

    return (
        <WarehouseLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header with Record Payment Button */}
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Payments Management</h1>
                            <p className="text-gray-600 mt-1">Manage and track all payment transactions</p>
                        </div>
                        
                        {/* Record Payment Button */}
                        <Button 
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-700 transition duration-150 flex items-center gap-2"
                        >
                            Record Payment
                        </Button>
                    </div>

                    {/* Payment summary cards */}
                    <PaymentSummary summary={data.summary} />

                    {/* Payment list */}
                    <div className="bg-white shadow-lg rounded-sm border border-gray-200 mb-8">
                        <PaymentsTable payments={data.payments} />
                    </div>

                    {/* Payment Form Modal */}
                    <PaymentFormModal 
                        isOpen={isModalOpen}
                        onOpenChange={setIsModalOpen}
                        onPaymentRecorded={handlePaymentRecorded}
                    />
                </div>
            </div>
        </WarehouseLayout>
    );
};

export default WarehousePaymentsPage;