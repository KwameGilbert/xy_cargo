const mockShipmentsData = {
  // Enhanced KPI data for admin dashboard
  kpiData: {
    totalShipmentsToday: 12,
    pendingShipments: 15,
    inTransitShipments: 28,
    deliveredThisWeek: 45,
    delayedShipments: 3,
    totalRevenue: '$125,430',
    averageDeliveryTime: '8.5 days',
    customerSatisfaction: 4.7
  },

  // Enhanced chart data
  statusDistribution: [
    { name: 'Pending', value: 15, color: '#F59E0B' },
    { name: 'Processing', value: 8, color: '#3B82F6' },
    { name: 'In Transit', value: 28, color: '#10B981' },
    { name: 'Delivered', value: 45, color: '#6366F1' },
    { name: 'Delayed', value: 3, color: '#EF4444' }
  ],

  weeklyShipmentTrend: [
    { date: 'Mon', count: 12, revenue: 15400 },
    { date: 'Tue', count: 18, revenue: 22300 },
    { date: 'Wed', count: 15, revenue: 18900 },
    { date: 'Thu', count: 22, revenue: 28700 },
    { date: 'Fri', count: 25, revenue: 31200 },
    { date: 'Sat', count: 8, revenue: 10200 },
    { date: 'Sun', count: 6, revenue: 7800 }
  ],

  carrierPerformance: [
    { name: 'DHL Express', shipments: 45, onTime: 92, avgCost: 185 },
    { name: 'FedEx', shipments: 32, onTime: 88, avgCost: 165 },
    { name: 'UPS', shipments: 28, onTime: 95, avgCost: 155 },
    { name: 'TNT', shipments: 18, onTime: 85, avgCost: 145 },
    { name: 'EMS', shipments: 12, onTime: 78, avgCost: 95 }
  ],

  // Enhanced shipments data with admin fields
  shipments: [
    {
      id: "SH-2024-001",
      trackingNumber: "XYC-SH-001234",
      status: "In Transit",
      priority: "High",
      originCountry: "China",
      destinationCountry: "Ghana",
      carrier: "DHL Express",
      departureDate: "2024-10-01",
      estimatedArrival: "2024-10-08",
      actualArrival: null,
      totalParcels: 5,
      totalWeight: "45.8 kg",
      totalVolume: "0.82 m³",
      shippingCost: "$850.00",
      insuranceValue: "$12,500.00",
      customsDuty: "$245.00",
      assignedWarehouse: "Warehouse A",
      assignedAgent: "Agent Sarah Johnson",
      createdBy: "Admin User",
      createdAt: "2024-09-28T10:30:00Z",
      lastUpdated: "2024-10-02T14:20:00Z",
      notes: "High priority shipment - electronics. Requires customs clearance.",
      customerSatisfaction: 4.8,
      delayReason: null,
      parcels: [
        {
          id: "WP-2024-001",
          description: "Electronics Package from Shenzhen",
          customerName: "John Doe",
          customerContact: "+233 20 123 4567",
          weight: "3.5 kg",
          dimensions: "45cm x 30cm x 20cm",
          paymentStatus: "Paid",
          specialHandling: true,
          declaredValue: "$2,500.00"
        },
        {
          id: "WP-2024-002",
          description: "Clothing Items",
          customerName: "Jane Smith",
          customerContact: "+233 24 987 6543",
          weight: "2.1 kg",
          dimensions: "40cm x 30cm x 15cm",
          paymentStatus: "Paid",
          specialHandling: false,
          declaredValue: "$450.00"
        },
        {
          id: "WP-2024-003",
          description: "Kitchenware Set",
          customerName: "Michael Johnson",
          customerContact: "+233 27 456 7890",
          weight: "5.3 kg",
          dimensions: "60cm x 40cm x 30cm",
          paymentStatus: "Pending",
          specialHandling: true,
          declaredValue: "$780.00"
        },
        {
          id: "WP-2024-004",
          description: "Mobile Phone Accessories",
          customerName: "Sarah Williams",
          customerContact: "+233 23 345 6789",
          weight: "1.2 kg",
          dimensions: "25cm x 20cm x 10cm",
          paymentStatus: "Paid",
          specialHandling: false,
          declaredValue: "$320.00"
        },
        {
          id: "WP-2024-005",
          description: "Computer Parts",
          customerName: "David Brown",
          customerContact: "+233 26 789 0123",
          weight: "4.8 kg",
          dimensions: "50cm x 40cm x 25cm",
          paymentStatus: "Paid",
          specialHandling: true,
          declaredValue: "$1,200.00"
        }
      ],
      timeline: [
        {
          status: "Created",
          location: "Warehouse A, Accra",
          timestamp: "2024-09-28T10:30:00Z",
          staff: "Admin User",
          notes: "Shipment created and assigned to DHL"
        },
        {
          status: "Processing",
          location: "Warehouse A, Accra",
          timestamp: "2024-09-29T08:15:00Z",
          staff: "Agent Sarah Johnson",
          notes: "Customs documentation prepared"
        },
        {
          status: "In Transit",
          location: "Dubai, UAE",
          timestamp: "2024-10-01T14:30:00Z",
          staff: "DHL Handler",
          notes: "Departed from origin warehouse"
        }
      ],
      documents: [
        { type: "Invoice", url: "/docs/invoice-001.pdf", uploadedAt: "2024-09-28T10:35:00Z" },
        { type: "Customs Declaration", url: "/docs/customs-001.pdf", uploadedAt: "2024-09-29T08:20:00Z" },
        { type: "Insurance Certificate", url: "/docs/insurance-001.pdf", uploadedAt: "2024-09-29T08:25:00Z" }
      ]
    },
    {
      id: "SH-2024-002",
      trackingNumber: "XYC-SH-001235",
      status: "Pending",
      priority: "Normal",
      originCountry: "USA",
      destinationCountry: "Ghana",
      carrier: "FedEx",
      departureDate: "2024-10-05",
      estimatedArrival: "2024-10-12",
      actualArrival: null,
      totalParcels: 3,
      totalWeight: "12.4 kg",
      totalVolume: "0.35 m³",
      shippingCost: "$420.00",
      insuranceValue: "$3,200.00",
      customsDuty: "$89.00",
      assignedWarehouse: "Warehouse B",
      assignedAgent: "Agent Michael Chen",
      createdBy: "Warehouse Manager",
      createdAt: "2024-09-30T15:45:00Z",
      lastUpdated: "2024-10-01T09:10:00Z",
      notes: "Standard shipment - books and documents",
      customerSatisfaction: null,
      delayReason: null,
      parcels: [
        {
          id: "WP-2024-006",
          description: "Textbooks and Educational Materials",
          customerName: "University of Ghana",
          customerContact: "+233 21 500 614",
          weight: "8.2 kg",
          dimensions: "40cm x 30cm x 25cm",
          paymentStatus: "Paid",
          specialHandling: false,
          declaredValue: "$1,800.00"
        },
        {
          id: "WP-2024-007",
          description: "Research Documents",
          customerName: "Dr. Emily Carter",
          customerContact: "+233 24 123 4567",
          weight: "2.1 kg",
          dimensions: "30cm x 25cm x 5cm",
          paymentStatus: "Paid",
          specialHandling: false,
          declaredValue: "$500.00"
        },
        {
          id: "WP-2024-008",
          description: "Lab Equipment",
          customerName: "Science Department",
          customerContact: "+233 20 987 6543",
          weight: "2.1 kg",
          dimensions: "35cm x 25cm x 15cm",
          paymentStatus: "Pending",
          specialHandling: true,
          declaredValue: "$900.00"
        }
      ],
      timeline: [
        {
          status: "Created",
          location: "Warehouse B, Accra",
          timestamp: "2024-09-30T15:45:00Z",
          staff: "Warehouse Manager",
          notes: "Awaiting customs clearance"
        }
      ],
      documents: [
        { type: "Commercial Invoice", url: "/docs/invoice-002.pdf", uploadedAt: "2024-09-30T15:50:00Z" }
      ]
    },
    {
      id: "SH-2024-003",
      trackingNumber: "XYC-SH-001236",
      status: "Delivered",
      priority: "Urgent",
      originCountry: "UK",
      destinationCountry: "Ghana",
      carrier: "DHL Express",
      departureDate: "2024-09-20",
      estimatedArrival: "2024-09-25",
      actualArrival: "2024-09-24",
      totalParcels: 2,
      totalWeight: "8.7 kg",
      totalVolume: "0.28 m³",
      shippingCost: "$680.00",
      insuranceValue: "$15,000.00",
      customsDuty: "$180.00",
      assignedWarehouse: "Warehouse A",
      assignedAgent: "Agent Sarah Johnson",
      createdBy: "Admin User",
      createdAt: "2024-09-18T11:20:00Z",
      lastUpdated: "2024-09-24T16:45:00Z",
      notes: "Urgent medical supplies - delivered ahead of schedule",
      customerSatisfaction: 5.0,
      delayReason: null,
      parcels: [
        {
          id: "WP-2024-009",
          description: "Medical Equipment",
          customerName: "Korle Bu Teaching Hospital",
          customerContact: "+233 30 266 1122",
          weight: "5.2 kg",
          dimensions: "50cm x 40cm x 30cm",
          paymentStatus: "Paid",
          specialHandling: true,
          declaredValue: "$8,500.00"
        },
        {
          id: "WP-2024-010",
          description: "Pharmaceuticals",
          customerName: "Central Medical Store",
          customerContact: "+233 30 266 1123",
          weight: "3.5 kg",
          dimensions: "30cm x 25cm x 20cm",
          paymentStatus: "Paid",
          specialHandling: true,
          declaredValue: "$6,500.00"
        }
      ],
      timeline: [
        {
          status: "Created",
          location: "Warehouse A, Accra",
          timestamp: "2024-09-18T11:20:00Z",
          staff: "Admin User",
          notes: "Urgent medical shipment - priority handling"
        },
        {
          status: "Processing",
          location: "Warehouse A, Accra",
          timestamp: "2024-09-19T09:00:00Z",
          staff: "Agent Sarah Johnson",
          notes: "Customs clearance expedited"
        },
        {
          status: "In Transit",
          location: "London, UK",
          timestamp: "2024-09-20T13:15:00Z",
          staff: "DHL Handler",
          notes: "Departed with express service"
        },
        {
          status: "Delivered",
          location: "Korle Bu Hospital, Accra",
          timestamp: "2024-09-24T16:45:00Z",
          staff: "Delivery Agent",
          notes: "Delivered to recipient - signature obtained"
        }
      ],
      documents: [
        { type: "Medical Certificate", url: "/docs/medical-cert-003.pdf", uploadedAt: "2024-09-18T11:25:00Z" },
        { type: "Customs Declaration", url: "/docs/customs-003.pdf", uploadedAt: "2024-09-19T09:05:00Z" },
        { type: "Delivery Receipt", url: "/docs/receipt-003.pdf", uploadedAt: "2024-09-24T16:50:00Z" }
      ]
    },
    {
      id: "SH-2024-004",
      trackingNumber: "XYC-SH-001237",
      status: "Delayed",
      priority: "High",
      originCountry: "Germany",
      destinationCountry: "Ghana",
      carrier: "UPS",
      departureDate: "2024-09-25",
      estimatedArrival: "2024-10-02",
      actualArrival: null,
      totalParcels: 4,
      totalWeight: "18.3 kg",
      totalVolume: "0.45 m³",
      shippingCost: "$395.00",
      insuranceValue: "$8,900.00",
      customsDuty: "$156.00",
      assignedWarehouse: "Warehouse C",
      assignedAgent: "Agent David Wilson",
      createdBy: "Warehouse Manager",
      createdAt: "2024-09-22T14:10:00Z",
      lastUpdated: "2024-10-03T11:30:00Z",
      notes: "Delayed due to carrier scheduling issues. Customer notified.",
      customerSatisfaction: 3.2,
      delayReason: "Carrier scheduling conflict - rescheduled for tomorrow",
      parcels: [
        {
          id: "WP-2024-011",
          description: "Industrial Parts",
          customerName: "Manufacturing Co. Ltd",
          customerContact: "+233 27 654 3210",
          weight: "6.8 kg",
          dimensions: "45cm x 35cm x 25cm",
          paymentStatus: "Paid",
          specialHandling: false,
          declaredValue: "$3,200.00"
        },
        {
          id: "WP-2024-012",
          description: "Tools and Equipment",
          customerName: "Engineering Services",
          customerContact: "+233 24 789 0123",
          weight: "4.2 kg",
          dimensions: "40cm x 30cm x 20cm",
          paymentStatus: "Paid",
          specialHandling: false,
          declaredValue: "$1,800.00"
        },
        {
          id: "WP-2024-013",
          description: "Safety Equipment",
          customerName: "Construction Ltd",
          customerContact: "+233 20 456 7890",
          weight: "3.9 kg",
          dimensions: "35cm x 25cm x 15cm",
          paymentStatus: "Paid",
          specialHandling: false,
          declaredValue: "$2,400.00"
        },
        {
          id: "WP-2024-014",
          description: "Documentation",
          customerName: "Quality Control Dept",
          customerContact: "+233 23 321 0987",
          weight: "3.4 kg",
          dimensions: "30cm x 25cm x 10cm",
          paymentStatus: "Paid",
          specialHandling: false,
          declaredValue: "$1,500.00"
        }
      ],
      timeline: [
        {
          status: "Created",
          location: "Warehouse C, Accra",
          timestamp: "2024-09-22T14:10:00Z",
          staff: "Warehouse Manager",
          notes: "High priority industrial shipment"
        },
        {
          status: "Processing",
          location: "Warehouse C, Accra",
          timestamp: "2024-09-23T10:20:00Z",
          staff: "Agent David Wilson",
          notes: "Prepared for UPS collection"
        },
        {
          status: "In Transit",
          location: "Frankfurt, Germany",
          timestamp: "2024-09-25T16:45:00Z",
          staff: "UPS Handler",
          notes: "Departed from origin"
        },
        {
          status: "Delayed",
          location: "Amsterdam, Netherlands",
          timestamp: "2024-10-03T11:30:00Z",
          staff: "UPS Operations",
          notes: "Flight delay due to weather - rescheduled for tomorrow"
        }
      ],
      documents: [
        { type: "Commercial Invoice", url: "/docs/invoice-004.pdf", uploadedAt: "2024-09-22T14:15:00Z" },
        { type: "Packing List", url: "/docs/packing-004.pdf", uploadedAt: "2024-09-23T10:25:00Z" }
      ]
    }
  ]
};

export default mockShipmentsData;