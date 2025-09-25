// Mock data for warehouse parcels section

export const mockParcelsData = {
  // KPI data for dashboard metrics
  kpiData: {
    totalParcelsToday: 32,
    pendingIntake: 8,
    specialHandlingRequired: 5,
    inTransitNow: 24,
    deliveredThisWeek: 87
  },

  // Status distribution for pie chart
  statusDistribution: [
    { name: 'Pending', value: 45 },
    { name: 'In Transit', value: 32 },
    { name: 'Delivered', value: 78 },
    { name: 'Special', value: 12 }
  ],

  // Daily intake trend for line chart
  dailyIntakeTrend: [
    { date: '2023-09-19', count: 28 },
    { date: '2023-09-20', count: 32 },
    { date: '2023-09-21', count: 25 },
    { date: '2023-09-22', count: 37 },
    { date: '2023-09-23', count: 42 },
    { date: '2023-09-24', count: 30 },
    { date: '2023-09-25', count: 32 }
  ],

  // Parcels list data
  parcels: [
    {
      id: 'PCL-001',
      trackingNumber: 'TRK-12345',
      customerName: 'John Doe',
      customerContact: '+233 55 123 4567',
      items: 3,
      totalWeight: 12.5,
      volume: '0.5 m³',
      declaredValue: '$250',
      status: 'Pending',
      dateCreated: '2023-09-25',
      specialHandling: false,
      paymentStatus: 'Paid'
    },
    {
      id: 'PCL-002',
      trackingNumber: 'TRK-12346',
      customerName: 'Jane Smith',
      customerContact: '+233 55 987 6543',
      items: 1,
      totalWeight: 5.2,
      volume: '0.2 m³',
      declaredValue: '$120',
      status: 'In Transit',
      dateCreated: '2023-09-24',
      specialHandling: false,
      paymentStatus: 'Paid'
    },
    {
      id: 'PCL-003',
      trackingNumber: 'TRK-12347',
      customerName: 'Robert Johnson',
      customerContact: '+233 55 456 7890',
      items: 5,
      totalWeight: 18.7,
      volume: '0.8 m³',
      declaredValue: '$350',
      status: 'Delivered',
      dateCreated: '2023-09-23',
      specialHandling: false,
      paymentStatus: 'Paid'
    },
    {
      id: 'PCL-004',
      trackingNumber: 'TRK-12348',
      customerName: 'Sarah Williams',
      customerContact: '+233 55 234 5678',
      items: 2,
      totalWeight: 8.3,
      volume: '0.3 m³',
      declaredValue: '$180',
      status: 'Pending',
      dateCreated: '2023-09-25',
      specialHandling: true,
      paymentStatus: 'Unpaid'
    },
    {
      id: 'PCL-005',
      trackingNumber: 'TRK-12349',
      customerName: 'Michael Brown',
      customerContact: '+233 55 345 6789',
      items: 4,
      totalWeight: 15.1,
      volume: '0.6 m³',
      declaredValue: '$280',
      status: 'In Transit',
      dateCreated: '2023-09-24',
      specialHandling: false,
      paymentStatus: 'Paid'
    },
    {
      id: 'PCL-006',
      trackingNumber: 'TRK-12350',
      customerName: 'Emily Davis',
      customerContact: '+233 55 456 7891',
      items: 1,
      totalWeight: 3.5,
      volume: '0.1 m³',
      declaredValue: '$90',
      status: 'Delivered',
      dateCreated: '2023-09-22',
      specialHandling: false,
      paymentStatus: 'Paid'
    },
    {
      id: 'PCL-007',
      trackingNumber: 'TRK-12351',
      customerName: 'David Wilson',
      customerContact: '+233 55 567 8901',
      items: 6,
      totalWeight: 22.4,
      volume: '0.9 m³',
      declaredValue: '$420',
      status: 'Pending',
      dateCreated: '2023-09-25',
      specialHandling: true,
      paymentStatus: 'Unpaid'
    },
    {
      id: 'PCL-008',
      trackingNumber: 'TRK-12352',
      customerName: 'Lisa Taylor',
      customerContact: '+233 55 678 9012',
      items: 2,
      totalWeight: 7.8,
      volume: '0.3 m³',
      declaredValue: '$160',
      status: 'In Transit',
      dateCreated: '2023-09-23',
      specialHandling: false,
      paymentStatus: 'Paid'
    }
  ],

  // Parcel detail data (for a specific parcel)
  parcelDetail: {
    id: 'PCL-001',
    trackingNumber: 'TRK-12345',
    customer: {
      name: 'John Doe',
      phone: '+233 55 123 4567',
      email: 'john.doe@example.com',
      address: '123 Main St, Accra, Ghana'
    },
    metrics: {
      totalWeight: 12.5,
      volume: '0.5 m³',
      declaredValue: '$250',
      paymentStatus: 'Paid',
      paymentDate: '2023-09-25'
    },
    items: [
      {
        name: 'Laptop',
        quantity: 1,
        weight: 2.5,
        dimensions: '35cm x 25cm x 3cm',
        specialPackaging: false
      },
      {
        name: 'Books',
        quantity: 5,
        weight: 7.5,
        dimensions: '30cm x 20cm x 15cm',
        specialPackaging: false
      },
      {
        name: 'Camera',
        quantity: 1,
        weight: 2.5,
        dimensions: '20cm x 15cm x 10cm',
        specialPackaging: false
      }
    ],
    status: 'Pending',
    timeline: [
      {
        status: 'Created',
        date: '2023-09-25 09:30',
        staff: 'Emma Johnson'
      },
      {
        status: 'Processing',
        date: '2023-09-25 11:45',
        staff: 'Daniel Smith'
      }
    ]
  }
};

export default mockParcelsData;