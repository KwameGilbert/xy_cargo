const mockShipmentsData = {
  // KPI data for the dashboard
  kpiData: {
    totalShipmentsToday: 5,
    pendingShipments: 8,
    inTransitShipments: 12,
    deliveredThisWeek: 15,
    totalParcelsShipped: 87
  },

  // Chart data
  statusDistribution: [
    { name: 'Pending', value: 8 },
    { name: 'Processing', value: 5 },
    { name: 'In Transit', value: 12 },
    { name: 'Delivered', value: 15 }
  ],
  
  weeklyShipmentTrend: [
    { date: 'Mon', count: 4 },
    { date: 'Tue', count: 6 },
    { date: 'Wed', count: 5 },
    { date: 'Thu', count: 8 },
    { date: 'Fri', count: 9 },
    { date: 'Sat', count: 3 },
    { date: 'Sun', count: 2 }
  ],

  // Shipments data with associated parcels
  shipments: [
    {
      id: "SH-2024-001",
      trackingNumber: "XYC-SH-001234",
      status: "In Transit",
      originCountry: "China",
      destinationCountry: "Ghana",
      carrier: "DHL Express",
      departureDate: "2024-09-15",
      estimatedArrival: "2024-09-22",
      actualArrival: null,
      totalParcels: 5,
      totalWeight: "45.8 kg",
      totalVolume: "0.82 m³",
      shippingCost: "$850.00",
      parcels: [
        {
          id: "WP-2024-001",
          description: "Electronics Package from Shenzhen",
          customerName: "John Doe",
          customerContact: "+233 20 123 4567",
          weight: "3.5 kg",
          dimensions: "45cm x 30cm x 20cm",
          paymentStatus: "Paid",
          specialHandling: true
        },
        {
          id: "WP-2024-002",
          description: "Clothing Items",
          customerName: "Jane Smith",
          customerContact: "+233 24 987 6543",
          weight: "2.1 kg",
          dimensions: "40cm x 30cm x 15cm",
          paymentStatus: "Paid",
          specialHandling: false
        },
        {
          id: "WP-2024-003",
          description: "Kitchenware Set",
          customerName: "Michael Johnson",
          customerContact: "+233 27 456 7890",
          weight: "5.3 kg",
          dimensions: "60cm x 40cm x 30cm",
          paymentStatus: "Pending",
          specialHandling: true
        },
        {
          id: "WP-2024-004",
          description: "Mobile Phone Accessories",
          customerName: "Sarah Williams",
          customerContact: "+233 23 345 6789",
          weight: "1.2 kg",
          dimensions: "25cm x 20cm x 10cm",
          paymentStatus: "Paid",
          specialHandling: false
        },
        {
          id: "WP-2024-005",
          description: "Computer Parts",
          customerName: "David Brown",
          customerContact: "+233 26 789 0123",
          weight: "4.8 kg",
          dimensions: "50cm x 40cm x 25cm",
          paymentStatus: "Paid",
          specialHandling: true
        }
      ],
      timeline: [
        {
          status: "In Transit",
          location: "Dubai, UAE",
          date: "2024-09-18 14:30",
          notes: "Shipment in transit to destination",
          staff: "System"
        },
        {
          status: "Departed",
          location: "Hong Kong",
          date: "2024-09-17 08:15",
          notes: "Shipment departed from transit hub",
          staff: "System"
        },
        {
          status: "Processing",
          location: "Guangzhou, China",
          date: "2024-09-16 16:45",
          notes: "Shipment processed at origin facility",
          staff: "Li Wei"
        },
        {
          status: "Created",
          location: "Guangzhou, China",
          date: "2024-09-15 10:00",
          notes: "Shipment created and parcels consolidated",
          staff: "Zhang Min"
        }
      ]
    },
    {
      id: "SH-2024-002",
      trackingNumber: "XYC-SH-001235",
      status: "Processing",
      originCountry: "United States",
      destinationCountry: "Ghana",
      carrier: "FedEx",
      departureDate: null,
      estimatedArrival: "2024-09-28",
      actualArrival: null,
      totalParcels: 3,
      totalWeight: "28.3 kg",
      totalVolume: "0.45 m³",
      shippingCost: "$620.00",
      parcels: [
        {
          id: "WP-2024-006",
          description: "Home Decor Items",
          customerName: "Emma Davis",
          customerContact: "+233 20 234 5678",
          weight: "3.7 kg",
          dimensions: "55cm x 35cm x 30cm",
          paymentStatus: "Paid",
          specialHandling: true
        },
        {
          id: "WP-2024-007",
          description: "Baby Products",
          customerName: "Robert Wilson",
          customerContact: "+233 24 567 8901",
          weight: "2.9 kg",
          dimensions: "45cm x 35cm x 20cm",
          paymentStatus: "Paid",
          specialHandling: false
        },
        {
          id: "WP-2024-008",
          description: "Books and Stationery",
          customerName: "Jennifer Taylor",
          customerContact: "+233 27 890 1234",
          weight: "8.5 kg",
          dimensions: "50cm x 40cm x 30cm",
          paymentStatus: "Pending",
          specialHandling: false
        }
      ],
      timeline: [
        {
          status: "Processing",
          location: "New York, USA",
          date: "2024-09-19 09:30",
          notes: "Shipment being prepared for international departure",
          staff: "John Smith"
        },
        {
          status: "Created",
          location: "New York, USA",
          date: "2024-09-18 14:00",
          notes: "Shipment created and parcels consolidated",
          staff: "Mary Johnson"
        }
      ]
    },
    {
      id: "SH-2024-003",
      trackingNumber: "XYC-SH-001236",
      status: "Delivered",
      originCountry: "United Kingdom",
      destinationCountry: "Ghana",
      carrier: "DHL Express",
      departureDate: "2024-09-10",
      estimatedArrival: "2024-09-17",
      actualArrival: "2024-09-16",
      totalParcels: 4,
      totalWeight: "32.6 kg",
      totalVolume: "0.58 m³",
      shippingCost: "$780.00",
      parcels: [
        {
          id: "WP-2024-009",
          description: "Designer Clothing",
          customerName: "Thomas Anderson",
          customerContact: "+233 20 345 6789",
          weight: "4.2 kg",
          dimensions: "60cm x 40cm x 25cm",
          paymentStatus: "Paid",
          specialHandling: false
        },
        {
          id: "WP-2024-010",
          description: "Shoes Collection",
          customerName: "Olivia Martin",
          customerContact: "+233 24 678 9012",
          weight: "5.8 kg",
          dimensions: "70cm x 50cm x 30cm",
          paymentStatus: "Paid",
          specialHandling: false
        },
        {
          id: "WP-2024-011",
          description: "Cosmetics and Beauty Products",
          customerName: "Sophia Clark",
          customerContact: "+233 27 901 2345",
          weight: "2.3 kg",
          dimensions: "35cm x 25cm x 15cm",
          paymentStatus: "Paid",
          specialHandling: true
        },
        {
          id: "WP-2024-012",
          description: "Jewelry Items",
          customerName: "William Lee",
          customerContact: "+233 23 456 7890",
          weight: "1.1 kg",
          dimensions: "20cm x 15cm x 10cm",
          paymentStatus: "Paid",
          specialHandling: true
        }
      ],
      timeline: [
        {
          status: "Delivered",
          location: "Accra, Ghana",
          date: "2024-09-16 13:45",
          notes: "Shipment delivered to warehouse",
          staff: "Kwame Mensah"
        },
        {
          status: "In Transit",
          location: "Lagos, Nigeria",
          date: "2024-09-15 10:30",
          notes: "Shipment in transit to destination",
          staff: "System"
        },
        {
          status: "Departed",
          location: "London, UK",
          date: "2024-09-12 08:00",
          notes: "Shipment departed from origin",
          staff: "System"
        },
        {
          status: "Processing",
          location: "London, UK",
          date: "2024-09-11 15:20",
          notes: "Shipment processed at origin facility",
          staff: "James Wilson"
        },
        {
          status: "Created",
          location: "London, UK",
          date: "2024-09-10 09:15",
          notes: "Shipment created and parcels consolidated",
          staff: "Emily Brown"
        }
      ]
    },
    {
      id: "SH-2024-004",
      trackingNumber: "XYC-SH-001237",
      status: "Pending",
      originCountry: "Germany",
      destinationCountry: "Ghana",
      carrier: "Not Assigned",
      departureDate: null,
      estimatedArrival: null,
      actualArrival: null,
      totalParcels: 2,
      totalWeight: "18.5 kg",
      totalVolume: "0.32 m³",
      shippingCost: "Not Calculated",
      parcels: [
        {
          id: "WP-2024-013",
          description: "Auto Parts",
          customerName: "Daniel Harris",
          customerContact: "+233 20 456 7890",
          weight: "12.3 kg",
          dimensions: "65cm x 45cm x 35cm",
          paymentStatus: "Pending",
          specialHandling: true
        },
        {
          id: "WP-2024-014",
          description: "Electronic Tools",
          customerName: "Ama Owusu",
          customerContact: "+233 24 789 0123",
          weight: "6.2 kg",
          dimensions: "50cm x 40cm x 25cm",
          paymentStatus: "Pending",
          specialHandling: false
        }
      ],
      timeline: [
        {
          status: "Pending",
          location: "Berlin, Germany",
          date: "2024-09-19 11:00",
          notes: "Shipment created, awaiting carrier assignment",
          staff: "Hans Mueller"
        }
      ]
    },
    {
      id: "SH-2024-005",
      trackingNumber: "XYC-SH-001238",
      status: "In Transit",
      originCountry: "Japan",
      destinationCountry: "Ghana",
      carrier: "UPS",
      departureDate: "2024-09-14",
      estimatedArrival: "2024-09-23",
      actualArrival: null,
      totalParcels: 3,
      totalWeight: "22.7 kg",
      totalVolume: "0.41 m³",
      shippingCost: "$720.00",
      parcels: [
        {
          id: "WP-2024-015",
          description: "Gaming Console",
          customerName: "Kofi Mensah",
          customerContact: "+233 20 567 8901",
          weight: "4.5 kg",
          dimensions: "50cm x 40cm x 20cm",
          paymentStatus: "Paid",
          specialHandling: true
        },
        {
          id: "WP-2024-016",
          description: "Camera Equipment",
          customerName: "Abena Boateng",
          customerContact: "+233 24 890 1234",
          weight: "3.8 kg",
          dimensions: "45cm x 35cm x 25cm",
          paymentStatus: "Paid",
          specialHandling: true
        },
        {
          id: "WP-2024-017",
          description: "Collectible Figures",
          customerName: "Kweku Annan",
          customerContact: "+233 27 012 3456",
          weight: "2.2 kg",
          dimensions: "40cm x 30cm x 20cm",
          paymentStatus: "Paid",
          specialHandling: false
        }
      ],
      timeline: [
        {
          status: "In Transit",
          location: "Dubai, UAE",
          date: "2024-09-19 16:45",
          notes: "Shipment in transit to destination",
          staff: "System"
        },
        {
          status: "Departed",
          location: "Tokyo, Japan",
          date: "2024-09-16 07:30",
          notes: "Shipment departed from origin",
          staff: "System"
        },
        {
          status: "Processing",
          location: "Tokyo, Japan",
          date: "2024-09-15 14:20",
          notes: "Shipment processed at origin facility",
          staff: "Tanaka Yuki"
        },
        {
          status: "Created",
          location: "Tokyo, Japan",
          date: "2024-09-14 10:00",
          notes: "Shipment created and parcels consolidated",
          staff: "Suzuki Hiroshi"
        }
      ]
    }
  ]
};

export default mockShipmentsData;