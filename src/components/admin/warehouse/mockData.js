const mockWarehousesData = {
  // Simple KPIs
  kpiData: {
    totalWarehouses: 6,
    activeWarehouses: 5
  },

  // Simple warehouse data
  warehouses: [
    {
      id: "WH-001",
      name: "Accra Main Warehouse",
      address: "123 Industrial Road, Accra, Ghana",
      shipmentType: "Sea Freight",
      status: "Active"
    },
    {
      id: "WH-002",
      name: "Tema Port Facility",
      address: "Port Access Road, Tema, Ghana",
      shipmentType: "Sea Express",
      status: "Active"
    },
    {
      id: "WH-003",
      name: "Kumasi Distribution Center",
      address: "Commercial Street, Kumasi, Ghana",
      shipmentType: "Road Freight",
      status: "Active"
    },
    {
      id: "WH-004",
      name: "Takoradi Harbor Warehouse",
      address: "Harbor Road, Takoradi, Ghana",
      shipmentType: "Sea Freight",
      status: "Active"
    },
    {
      id: "WH-005",
      name: "Cape Coast Transit Hub",
      address: "Coastal Highway, Cape Coast, Ghana",
      shipmentType: "Mixed Cargo",
      status: "Maintenance"
    },
    {
      id: "WH-006",
      name: "Tamale Regional Depot",
      address: "Northern Highway, Tamale, Ghana",
      shipmentType: "Road Freight",
      status: "Inactive"
    }
  ]
};

export default mockWarehousesData;