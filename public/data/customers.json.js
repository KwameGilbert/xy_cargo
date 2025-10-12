// Mock data for customers management
export const customers = [
  {
    id: "CUST-001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+260-211-123456",
    dateOfBirth: "1985-03-15",
    gender: "Male",
    address: {
      street: "123 Main Street",
      city: "Lusaka",
      state: "Lusaka Province",
      zipCode: "10101",
      country: "Zambia"
    },
    registrationDate: "2023-01-15T10:30:00Z",
    lastLogin: "2024-10-10T14:20:00Z",
    status: "Active",
    accountType: "Individual",
    totalParcels: 45,
    totalSpent: 2850.75,
    loyaltyPoints: 285,
    preferredPaymentMethod: "Credit Card",
    verificationStatus: "Verified",
    profileImage: null,
    notes: "Regular customer, prefers express delivery",
    parcels: [
      {
        id: "PAR-001",
        trackingNumber: "XYC-2024-001",
        status: "Delivered",
        createdAt: "2024-10-01T09:00:00Z"
      },
      {
        id: "PAR-002",
        trackingNumber: "XYC-2024-002",
        status: "In Transit",
        createdAt: "2024-10-08T11:30:00Z"
      }
    ]
  },
  {
    id: "CUST-002",
    firstName: "Mary",
    lastName: "Johnson",
    email: "mary.johnson@email.com",
    phone: "+260-211-234567",
    dateOfBirth: "1990-07-22",
    gender: "Female",
    address: {
      street: "456 Oak Avenue",
      city: "Ndola",
      state: "Copperbelt Province",
      zipCode: "10102",
      country: "Zambia"
    },
    registrationDate: "2023-03-20T14:15:00Z",
    lastLogin: "2024-10-09T16:45:00Z",
    status: "Active",
    accountType: "Business",
    totalParcels: 78,
    totalSpent: 5420.50,
    loyaltyPoints: 542,
    preferredPaymentMethod: "Bank Transfer",
    verificationStatus: "Verified",
    profileImage: null,
    notes: "Business account - Johnson Enterprises",
    parcels: [
      {
        id: "PAR-003",
        trackingNumber: "XYC-2024-003",
        status: "Delivered",
        createdAt: "2024-09-25T08:15:00Z"
      }
    ]
  },
  {
    id: "CUST-003",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@email.com",
    phone: "+260-211-345678",
    dateOfBirth: "1978-11-08",
    gender: "Male",
    address: {
      street: "789 Pine Road",
      city: "Kitwe",
      state: "Copperbelt Province",
      zipCode: "10103",
      country: "Zambia"
    },
    registrationDate: "2023-05-10T12:00:00Z",
    lastLogin: "2024-09-15T10:20:00Z",
    status: "Inactive",
    accountType: "Individual",
    totalParcels: 12,
    totalSpent: 450.25,
    loyaltyPoints: 45,
    preferredPaymentMethod: "Cash on Delivery",
    verificationStatus: "Verified",
    profileImage: null,
    notes: "Account inactive for 3+ months",
    parcels: []
  },
  {
    id: "CUST-004",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@email.com",
    phone: "+260-211-456789",
    dateOfBirth: "1995-01-30",
    gender: "Female",
    address: {
      street: "321 Elm Street",
      city: "Livingstone",
      state: "Southern Province",
      zipCode: "10104",
      country: "Zambia"
    },
    registrationDate: "2023-07-05T16:45:00Z",
    lastLogin: "2024-10-11T09:30:00Z",
    status: "Active",
    accountType: "Individual",
    totalParcels: 23,
    totalSpent: 1250.00,
    loyaltyPoints: 125,
    preferredPaymentMethod: "Mobile Money",
    verificationStatus: "Pending",
    profileImage: null,
    notes: "ID verification pending",
    parcels: [
      {
        id: "PAR-004",
        trackingNumber: "XYC-2024-004",
        status: "Processing",
        createdAt: "2024-10-10T13:20:00Z"
      }
    ]
  },
  {
    id: "CUST-005",
    firstName: "Michael",
    lastName: "Davis",
    email: "michael.davis@email.com",
    phone: "+260-211-567890",
    dateOfBirth: "1982-09-12",
    gender: "Male",
    address: {
      street: "654 Cedar Lane",
      city: "Chingola",
      state: "Copperbelt Province",
      zipCode: "10105",
      country: "Zambia"
    },
    registrationDate: "2023-09-18T11:10:00Z",
    lastLogin: "2024-10-05T15:40:00Z",
    status: "Active",
    accountType: "Business",
    totalParcels: 156,
    totalSpent: 12850.75,
    loyaltyPoints: 1285,
    preferredPaymentMethod: "Credit Card",
    verificationStatus: "Verified",
    profileImage: null,
    notes: "High-value business customer",
    parcels: [
      {
        id: "PAR-005",
        trackingNumber: "XYC-2024-005",
        status: "Delivered",
        createdAt: "2024-10-03T10:00:00Z"
      },
      {
        id: "PAR-006",
        trackingNumber: "XYC-2024-006",
        status: "Out for Delivery",
        createdAt: "2024-10-07T14:30:00Z"
      }
    ]
  },
  {
    id: "CUST-006",
    firstName: "Emma",
    lastName: "Wilson",
    email: "emma.wilson@email.com",
    phone: "+260-211-678901",
    dateOfBirth: "1998-04-25",
    gender: "Female",
    address: {
      street: "987 Birch Boulevard",
      city: "Kabwe",
      state: "Central Province",
      zipCode: "10106",
      country: "Zambia"
    },
    registrationDate: "2024-01-08T13:25:00Z",
    lastLogin: "2024-10-08T12:15:00Z",
    status: "Active",
    accountType: "Individual",
    totalParcels: 8,
    totalSpent: 320.50,
    loyaltyPoints: 32,
    preferredPaymentMethod: "Mobile Money",
    verificationStatus: "Verified",
    profileImage: null,
    notes: "New customer, good feedback",
    parcels: [
      {
        id: "PAR-007",
        trackingNumber: "XYC-2024-007",
        status: "Delivered",
        createdAt: "2024-10-06T16:45:00Z"
      }
    ]
  },
  {
    id: "CUST-007",
    firstName: "James",
    lastName: "Taylor",
    email: "james.taylor@email.com",
    phone: "+260-211-789012",
    dateOfBirth: "1975-12-03",
    gender: "Male",
    address: {
      street: "147 Maple Drive",
      city: "Mufulira",
      state: "Copperbelt Province",
      zipCode: "10107",
      country: "Zambia"
    },
    registrationDate: "2022-11-22T09:50:00Z",
    lastLogin: "2024-08-20T11:00:00Z",
    status: "Suspended",
    accountType: "Individual",
    totalParcels: 67,
    totalSpent: 2150.25,
    loyaltyPoints: 0,
    preferredPaymentMethod: "Credit Card",
    verificationStatus: "Verified",
    profileImage: null,
    notes: "Account suspended - payment issues",
    parcels: []
  },
  {
    id: "CUST-008",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@email.com",
    phone: "+260-211-890123",
    dateOfBirth: "1988-06-18",
    gender: "Female",
    address: {
      street: "258 Spruce Street",
      city: "Chipata",
      state: "Eastern Province",
      zipCode: "10108",
      country: "Zambia"
    },
    registrationDate: "2023-11-30T15:20:00Z",
    lastLogin: "2024-10-11T08:45:00Z",
    status: "Active",
    accountType: "Business",
    totalParcels: 34,
    totalSpent: 2890.00,
    loyaltyPoints: 289,
    preferredPaymentMethod: "Bank Transfer",
    verificationStatus: "Verified",
    profileImage: null,
    notes: "Growing business account",
    parcels: [
      {
        id: "PAR-008",
        trackingNumber: "XYC-2024-008",
        status: "Processing",
        createdAt: "2024-10-09T10:15:00Z"
      }
    ]
  }
];