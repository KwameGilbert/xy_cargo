// Mock customer data for warehouse parcels section

export const mockCustomersData = {
  customers: [
    {
      id: 'CUST-001',
      name: 'John Doe',
      phone: '+233 55 123 4567',
      email: 'john.doe@example.com',
      addresses: [
        {
          id: 'ADDR-001',
          type: 'Home',
          street: '123 Main St',
          city: 'Accra',
          state: 'Greater Accra',
          country: 'Ghana',
          postalCode: '00233',
          isDefault: true
        },
        {
          id: 'ADDR-002',
          type: 'Office',
          street: '456 Business Ave',
          city: 'Accra',
          state: 'Greater Accra',
          country: 'Ghana',
          postalCode: '00233',
          isDefault: false
        }
      ]
    },
    {
      id: 'CUST-002',
      name: 'Jane Smith',
      phone: '+233 55 987 6543',
      email: 'jane.smith@example.com',
      addresses: [
        {
          id: 'ADDR-003',
          type: 'Home',
          street: '789 Residential Rd',
          city: 'Kumasi',
          state: 'Ashanti',
          country: 'Ghana',
          postalCode: '00234',
          isDefault: true
        }
      ]
    },
    {
      id: 'CUST-003',
      name: 'Robert Johnson',
      phone: '+233 55 456 7890',
      email: 'robert.johnson@example.com',
      addresses: [
        {
          id: 'ADDR-004',
          type: 'Home',
          street: '321 Oak Street',
          city: 'Tamale',
          state: 'Northern',
          country: 'Ghana',
          postalCode: '00235',
          isDefault: true
        },
        {
          id: 'ADDR-005',
          type: 'Office',
          street: '654 Pine Avenue',
          city: 'Accra',
          state: 'Greater Accra',
          country: 'Ghana',
          postalCode: '00233',
          isDefault: false
        },
        {
          id: 'ADDR-006',
          type: 'Warehouse',
          street: '987 Storage Blvd',
          city: 'Tema',
          state: 'Greater Accra',
          country: 'Ghana',
          postalCode: '00236',
          isDefault: false
        }
      ]
    },
    {
      id: 'CUST-004',
      name: 'Sarah Williams',
      phone: '+233 55 234 5678',
      email: 'sarah.williams@example.com',
      addresses: [
        {
          id: 'ADDR-007',
          type: 'Home',
          street: '246 Maple Drive',
          city: 'Cape Coast',
          state: 'Central',
          country: 'Ghana',
          postalCode: '00237',
          isDefault: true
        },
        {
          id: 'ADDR-008',
          type: 'Office',
          street: '135 Cedar Lane',
          city: 'Cape Coast',
          state: 'Central',
          country: 'Ghana',
          postalCode: '00237',
          isDefault: false
        }
      ]
    },
    {
      id: 'CUST-005',
      name: 'Michael Brown',
      phone: '+233 55 345 6789',
      email: 'michael.brown@example.com',
      addresses: [
        {
          id: 'ADDR-009',
          type: 'Home',
          street: '753 Birch Court',
          city: 'Sekondi-Takoradi',
          state: 'Western',
          country: 'Ghana',
          postalCode: '00238',
          isDefault: true
        }
      ]
    }
  ],

  // Shipment types with origin warehouses
  shipmentTypes: [
    {
      code: 'STD',
      name: 'Standard Shipping',
      description: 'Regular shipping with 5-7 business days delivery',
      origin: {
        warehouse: 'Accra Central Warehouse',
        address: '123 Industrial Area, Accra, Greater Accra, Ghana 00233'
      },
      deliveryTime: '5-7 business days',
      costPerKg: 2.5
    },
    {
      code: 'EXP',
      name: 'Express Shipping',
      description: 'Fast shipping with 2-3 business days delivery',
      origin: {
        warehouse: 'Tema Express Hub',
        address: '456 Logistics Park, Tema, Greater Accra, Ghana 00236'
      },
      deliveryTime: '2-3 business days',
      costPerKg: 5.0
    },
    {
      code: 'PRI',
      name: 'Priority Shipping',
      description: 'Next business day delivery for urgent shipments',
      origin: {
        warehouse: 'Kotoka Airport Hub',
        address: '789 Cargo Terminal, Kotoka Airport, Accra, Ghana 00233'
      },
      deliveryTime: '1 business day',
      costPerKg: 8.0
    },
    {
      code: 'ECO',
      name: 'Economy Shipping',
      description: 'Cost-effective shipping with 7-10 business days delivery',
      origin: {
        warehouse: 'Kumasi Regional Warehouse',
        address: '321 Storage Complex, Kumasi, Ashanti, Ghana 00234'
      },
      deliveryTime: '7-10 business days',
      costPerKg: 1.5
    },
    {
      code: 'INT',
      name: 'International Shipping',
      description: 'International delivery with customs clearance',
      origin: {
        warehouse: 'International Shipping Center',
        address: '555 Global Logistics, Tema Port, Greater Accra, Ghana 00236'
      },
      deliveryTime: '10-15 business days',
      costPerKg: 12.0
    }
  ],

  // Function to get a formatted address string
  getFormattedAddress: (address) => {
    return `${address.street}, ${address.city}, ${address.state}, ${address.country} ${address.postalCode}`;
  },
  
  // Function to get customer by ID
  getCustomerById: (id) => {
    return mockCustomersData.customers.find(customer => customer.id === id);
  },
  
  // Function to get customer's default address
  getDefaultAddress: (customerId) => {
    const customer = mockCustomersData.getCustomerById(customerId);
    if (customer) {
      return customer.addresses.find(address => address.isDefault) || customer.addresses[0];
    }
    return null;
  },

  // Function to get shipment type by code
  getShipmentTypeByCode: (code) => {
    return mockCustomersData.shipmentTypes.find(type => type.code === code);
  },

  // Function to get default shipment type
  getDefaultShipmentType: () => {
    return mockCustomersData.shipmentTypes.find(type => type.code === 'STD');
  },

  // Function to parse customer-shipment code and return both customer and shipment type
  parseCustomerShipmentCode: (code) => {
    const codeParts = code.split('-');
    if (codeParts.length < 3) {
      return null;
    }
    
    const customerId = `${codeParts[0]}-${codeParts[1]}`;
    const shipmentCode = codeParts[2];
    
    const customer = mockCustomersData.getCustomerById(customerId);
    const shipmentType = mockCustomersData.getShipmentTypeByCode(shipmentCode);
    
    if (!customer || !shipmentType) {
      return null;
    }
    
    return {
      customer,
      shipmentType
    };
  },

  // Function to generate customer-shipment code
  generateCustomerShipmentCode: (customerId, shipmentCode) => {
    return `${customerId}-${shipmentCode}`;
  },

  // Function to get all valid customer-shipment codes for a customer
  getCustomerShipmentCodes: (customerId) => {
    const customer = mockCustomersData.getCustomerById(customerId);
    if (!customer) return [];
    
    return mockCustomersData.shipmentTypes.map(type => 
      mockCustomersData.generateCustomerShipmentCode(customerId, type.code)
    );
  }
};

export default mockCustomersData;