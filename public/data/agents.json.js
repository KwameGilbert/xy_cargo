// Mock data for agents management
export const agents = [
  {
    id: "AGT-001",
    firstName: "Michael",
    lastName: "Thompson",
    email: "michael.thompson@xyagents.com",
    phone: "+260-211-123456",
    dateOfBirth: "1985-03-15",
    gender: "Male",
    address: {
      street: "123 Agent Street",
      city: "Lusaka",
      state: "Lusaka Province",
      zipCode: "10101",
      country: "Zambia"
    },
    registrationDate: "2023-01-15T10:30:00Z",
    lastLogin: "2024-10-10T14:20:00Z",
    status: "Active",
    agentType: "Individual",
    commissionRate: 8.5,
    totalEarnings: 45250.75,
    totalCommissions: 3856.31,
    totalCustomers: 45,
    totalParcels: 234,
    performanceRating: 4.8,
    bankDetails: {
      bankName: "Zambia National Commercial Bank",
      accountNumber: "1234567890",
      accountName: "Michael Thompson"
    },
    documents: {
      idCard: true,
      businessLicense: false,
      taxCertificate: true
    },
    notes: "Top performing agent, excellent customer service",
    recentActivity: [
      {
        type: "commission",
        amount: 125.50,
        description: "Commission from parcel delivery",
        date: "2024-10-08T10:00:00Z"
      },
      {
        type: "customer",
        description: "Added new customer John Smith",
        date: "2024-10-07T15:30:00Z"
      }
    ]
  },
  {
    id: "AGT-002",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@xyagents.com",
    phone: "+260-211-234567",
    dateOfBirth: "1990-07-22",
    gender: "Female",
    address: {
      street: "456 Agent Avenue",
      city: "Ndola",
      state: "Copperbelt Province",
      zipCode: "10102",
      country: "Zambia"
    },
    registrationDate: "2023-03-20T14:15:00Z",
    lastLogin: "2024-10-09T16:45:00Z",
    status: "Active",
    agentType: "Business",
    commissionRate: 7.2,
    totalEarnings: 67890.50,
    totalCommissions: 4891.24,
    totalCustomers: 78,
    totalParcels: 456,
    performanceRating: 4.6,
    bankDetails: {
      bankName: "First National Bank",
      accountNumber: "2345678901",
      accountName: "Sarah Johnson Enterprises"
    },
    documents: {
      idCard: true,
      businessLicense: true,
      taxCertificate: true
    },
    notes: "Business agent with multiple locations",
    recentActivity: [
      {
        type: "commission",
        amount: 245.75,
        description: "Bulk parcel commission",
        date: "2024-10-09T11:20:00Z"
      }
    ]
  },
  {
    id: "AGT-003",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@xyagents.com",
    phone: "+260-211-345678",
    dateOfBirth: "1978-11-08",
    gender: "Male",
    address: {
      street: "789 Agent Road",
      city: "Kitwe",
      state: "Copperbelt Province",
      zipCode: "10103",
      country: "Zambia"
    },
    registrationDate: "2023-05-10T12:00:00Z",
    lastLogin: "2024-09-15T10:20:00Z",
    status: "Inactive",
    agentType: "Individual",
    commissionRate: 6.5,
    totalEarnings: 12500.25,
    totalCommissions: 812.52,
    totalCustomers: 12,
    totalParcels: 67,
    performanceRating: 3.2,
    bankDetails: {
      bankName: "Zambia National Commercial Bank",
      accountNumber: "3456789012",
      accountName: "David Brown"
    },
    documents: {
      idCard: true,
      businessLicense: false,
      taxCertificate: false
    },
    notes: "Account inactive, low performance metrics",
    recentActivity: []
  },
  {
    id: "AGT-004",
    firstName: "Emma",
    lastName: "Williams",
    email: "emma.williams@xyagents.com",
    phone: "+260-211-456789",
    dateOfBirth: "1995-01-30",
    gender: "Female",
    address: {
      street: "321 Agent Street",
      city: "Livingstone",
      state: "Southern Province",
      zipCode: "10104",
      country: "Zambia"
    },
    registrationDate: "2023-07-05T16:45:00Z",
    lastLogin: "2024-10-11T09:30:00Z",
    status: "Active",
    agentType: "Individual",
    commissionRate: 9.0,
    totalEarnings: 34500.00,
    totalCommissions: 3105.00,
    totalCustomers: 38,
    totalParcels: 189,
    performanceRating: 4.9,
    bankDetails: {
      bankName: "Stanbic Bank",
      accountNumber: "4567890123",
      accountName: "Emma Williams"
    },
    documents: {
      idCard: true,
      businessLicense: false,
      taxCertificate: true
    },
    notes: "High-performing agent, excellent customer feedback",
    recentActivity: [
      {
        type: "commission",
        amount: 89.25,
        description: "Express delivery commission",
        date: "2024-10-10T14:15:00Z"
      },
      {
        type: "customer",
        description: "Added new customer Mary Johnson",
        date: "2024-10-09T12:45:00Z"
      }
    ]
  },
  {
    id: "AGT-005",
    firstName: "James",
    lastName: "Davis",
    email: "james.davis@xyagents.com",
    phone: "+260-211-567890",
    dateOfBirth: "1982-09-12",
    gender: "Male",
    address: {
      street: "654 Agent Lane",
      city: "Chingola",
      state: "Copperbelt Province",
      zipCode: "10105",
      country: "Zambia"
    },
    registrationDate: "2023-09-18T11:10:00Z",
    lastLogin: "2024-10-05T15:40:00Z",
    status: "Active",
    agentType: "Business",
    commissionRate: 7.8,
    totalEarnings: 89500.75,
    totalCommissions: 6981.06,
    totalCustomers: 95,
    totalParcels: 567,
    performanceRating: 4.4,
    bankDetails: {
      bankName: "Investrust Bank",
      accountNumber: "5678901234",
      accountName: "James Davis Logistics"
    },
    documents: {
      idCard: true,
      businessLicense: true,
      taxCertificate: true
    },
    notes: "Established business agent with good track record",
    recentActivity: [
      {
        type: "commission",
        amount: 312.40,
        description: "Monthly bulk commission",
        date: "2024-10-01T09:00:00Z"
      }
    ]
  },
  {
    id: "AGT-006",
    firstName: "Lisa",
    lastName: "Wilson",
    email: "lisa.wilson@xyagents.com",
    phone: "+260-211-678901",
    dateOfBirth: "1998-04-25",
    gender: "Female",
    address: {
      street: "987 Agent Boulevard",
      city: "Kabwe",
      state: "Central Province",
      zipCode: "10106",
      country: "Zambia"
    },
    registrationDate: "2024-01-08T13:25:00Z",
    lastLogin: "2024-10-08T12:15:00Z",
    status: "Active",
    agentType: "Individual",
    commissionRate: 8.0,
    totalEarnings: 12800.50,
    totalCommissions: 1024.04,
    totalCustomers: 16,
    totalParcels: 89,
    performanceRating: 4.7,
    bankDetails: {
      bankName: "Zambia National Commercial Bank",
      accountNumber: "6789012345",
      accountName: "Lisa Wilson"
    },
    documents: {
      idCard: true,
      businessLicense: false,
      taxCertificate: true
    },
    notes: "New agent showing great potential",
    recentActivity: [
      {
        type: "customer",
        description: "Added new customer Robert Taylor",
        date: "2024-10-08T10:30:00Z"
      }
    ]
  },
  {
    id: "AGT-007",
    firstName: "Robert",
    lastName: "Taylor",
    email: "robert.taylor@xyagents.com",
    phone: "+260-211-789012",
    dateOfBirth: "1975-12-03",
    gender: "Male",
    address: {
      street: "147 Agent Drive",
      city: "Mufulira",
      state: "Copperbelt Province",
      zipCode: "10107",
      country: "Zambia"
    },
    registrationDate: "2022-11-22T09:50:00Z",
    lastLogin: "2024-08-20T11:00:00Z",
    status: "Suspended",
    agentType: "Individual",
    commissionRate: 5.5,
    totalEarnings: 15600.25,
    totalCommissions: 858.01,
    totalCustomers: 28,
    totalParcels: 145,
    performanceRating: 2.8,
    bankDetails: {
      bankName: "First National Bank",
      accountNumber: "7890123456",
      accountName: "Robert Taylor"
    },
    documents: {
      idCard: true,
      businessLicense: false,
      taxCertificate: false
    },
    notes: "Account suspended - commission disputes",
    recentActivity: []
  },
  {
    id: "AGT-008",
    firstName: "Anna",
    lastName: "Anderson",
    email: "anna.anderson@xyagents.com",
    phone: "+260-211-890123",
    dateOfBirth: "1988-06-18",
    gender: "Female",
    address: {
      street: "258 Agent Street",
      city: "Chipata",
      state: "Eastern Province",
      zipCode: "10108",
      country: "Zambia"
    },
    registrationDate: "2023-11-30T15:20:00Z",
    lastLogin: "2024-10-11T08:45:00Z",
    status: "Active",
    agentType: "Business",
    commissionRate: 8.2,
    totalEarnings: 56750.00,
    totalCommissions: 4653.50,
    totalCustomers: 69,
    totalParcels: 378,
    performanceRating: 4.5,
    bankDetails: {
      bankName: "Stanbic Bank",
      accountNumber: "8901234567",
      accountName: "Anderson Shipping Services"
    },
    documents: {
      idCard: true,
      businessLicense: true,
      taxCertificate: true
    },
    notes: "Growing business with consistent performance",
    recentActivity: [
      {
        type: "commission",
        amount: 178.90,
        description: "International shipment commission",
        date: "2024-10-11T08:00:00Z"
      }
    ]
  }
];