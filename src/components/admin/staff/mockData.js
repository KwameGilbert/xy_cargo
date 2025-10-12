const mockStaffData = {
  // Staff KPIs
  kpiData: {
    totalStaff: 24,
    activeStaff: 22,
    onLeave: 2
  },

  // Staff data
  staff: [
    {
      id: "STF-001",
      firstName: "Kofi",
      lastName: "Mensah",
      email: "kofi.mensah@xy-cargo.com",
      phone: "+233 24 123 4567",
      role: "Warehouse Manager",
      department: "Operations",
      warehouse: "WH-001",
      warehouseName: "Accra Main Warehouse",
      status: "Active",
      hireDate: "2022-03-15",
      salary: 4500,
      shift: "Day",
      emergencyContact: {
        name: "Adwoa Mensah",
        phone: "+233 20 987 6543",
        relationship: "Wife"
      },
      skills: ["Forklift Operation", "Inventory Management", "Team Leadership"],
      performance: "Excellent"
    },
    {
      id: "STF-002",
      firstName: "Ama",
      lastName: "Osei",
      email: "ama.osei@xy-cargo.com",
      phone: "+233 24 234 5678",
      role: "Forklift Operator",
      department: "Operations",
      warehouse: "WH-001",
      warehouseName: "Accra Main Warehouse",
      status: "Active",
      hireDate: "2023-01-10",
      salary: 2800,
      shift: "Night",
      emergencyContact: {
        name: "Kwame Osei",
        phone: "+233 20 876 5432",
        relationship: "Brother"
      },
      skills: ["Forklift Operation", "Safety Protocols", "Loading/Unloading"],
      performance: "Good"
    },
    {
      id: "STF-003",
      firstName: "Yaw",
      lastName: "Asante",
      email: "yaw.asante@xy-cargo.com",
      phone: "+233 24 345 6789",
      role: "Inventory Clerk",
      department: "Administration",
      warehouse: "WH-002",
      warehouseName: "Tema Port Facility",
      status: "Active",
      hireDate: "2022-08-20",
      salary: 2200,
      shift: "Day",
      emergencyContact: {
        name: "Efua Asante",
        phone: "+233 20 765 4321",
        relationship: "Mother"
      },
      skills: ["Data Entry", "Inventory Tracking", "Basic Accounting"],
      performance: "Excellent"
    },
    {
      id: "STF-004",
      firstName: "Akua",
      lastName: "Boateng",
      email: "akua.boateng@xy-cargo.com",
      phone: "+233 24 456 7890",
      role: "Security Guard",
      department: "Security",
      warehouse: "WH-003",
      warehouseName: "Kumasi Distribution Center",
      status: "Active",
      hireDate: "2023-05-12",
      salary: 1800,
      shift: "Night",
      emergencyContact: {
        name: "Kofi Boateng",
        phone: "+233 20 654 3210",
        relationship: "Father"
      },
      skills: ["Security Protocols", "Surveillance", "First Aid"],
      performance: "Good"
    },
    {
      id: "STF-005",
      firstName: "Kwasi",
      lastName: "Nkrumah",
      email: "kwasi.nkrumah@xy-cargo.com",
      phone: "+233 24 567 8901",
      role: "Maintenance Technician",
      department: "Maintenance",
      warehouse: "WH-004",
      warehouseName: "Takoradi Harbor Warehouse",
      status: "Active",
      hireDate: "2021-11-08",
      salary: 3200,
      shift: "Day",
      emergencyContact: {
        name: "Abena Nkrumah",
        phone: "+233 20 543 2109",
        relationship: "Sister"
      },
      skills: ["Electrical Repair", "Mechanical Maintenance", "Equipment Troubleshooting"],
      performance: "Excellent"
    },
    {
      id: "STF-006",
      firstName: "Nana",
      lastName: "Ama",
      email: "nana.ama@xy-cargo.com",
      phone: "+233 24 678 9012",
      role: "Quality Control Inspector",
      department: "Quality Assurance",
      warehouse: "WH-005",
      warehouseName: "Cape Coast Transit Hub",
      status: "On Leave",
      hireDate: "2022-06-30",
      salary: 2600,
      shift: "Day",
      emergencyContact: {
        name: "Yaw Ama",
        phone: "+233 20 432 1098",
        relationship: "Husband"
      },
      skills: ["Quality Inspection", "Documentation", "Compliance"],
      performance: "Good"
    },
    {
      id: "STF-007",
      firstName: "Esi",
      lastName: "Adjei",
      email: "esi.adjei@xy-cargo.com",
      phone: "+233 24 789 0123",
      role: "Customer Service Rep",
      department: "Customer Service",
      warehouse: "WH-001",
      warehouseName: "Accra Main Warehouse",
      status: "Active",
      hireDate: "2023-09-15",
      salary: 2000,
      shift: "Day",
      emergencyContact: {
        name: "Kojo Adjei",
        phone: "+233 20 321 0987",
        relationship: "Son"
      },
      skills: ["Customer Service", "Communication", "Problem Solving"],
      performance: "Good"
    },
    {
      id: "STF-008",
      firstName: "Kweku",
      lastName: "Annan",
      email: "kweku.annan@xy-cargo.com",
      phone: "+233 24 890 1234",
      role: "Driver",
      department: "Transportation",
      warehouse: "WH-006",
      warehouseName: "Tamale Regional Depot",
      status: "Active",
      hireDate: "2022-12-01",
      salary: 2400,
      shift: "Day",
      emergencyContact: {
        name: "Akosua Annan",
        phone: "+233 20 210 9876",
        relationship: "Wife"
      },
      skills: ["Driving", "Route Planning", "Vehicle Maintenance"],
      performance: "Excellent"
    },
    {
      id: "STF-009",
      firstName: "Adwoa",
      lastName: "Frimpong",
      email: "adwoa.frimpong@xy-cargo.com",
      phone: "+233 24 901 2345",
      role: "HR Assistant",
      department: "Human Resources",
      warehouse: "WH-001",
      warehouseName: "Accra Main Warehouse",
      status: "Active",
      hireDate: "2023-03-22",
      salary: 2500,
      shift: "Day",
      emergencyContact: {
        name: "Francis Frimpong",
        phone: "+233 20 109 8765",
        relationship: "Brother"
      },
      skills: ["HR Administration", "Recruitment", "Employee Relations"],
      performance: "Good"
    },
    {
      id: "STF-010",
      firstName: "Yaw",
      lastName: "Owusu",
      email: "yaw.owusu@xy-cargo.com",
      phone: "+233 24 012 3456",
      role: "Warehouse Supervisor",
      department: "Operations",
      warehouse: "WH-002",
      warehouseName: "Tema Port Facility",
      status: "Active",
      hireDate: "2021-07-14",
      salary: 3800,
      shift: "Day",
      emergencyContact: {
        name: "Akua Owusu",
        phone: "+233 20 098 7654",
        relationship: "Wife"
      },
      skills: ["Team Management", "Process Optimization", "Safety Compliance"],
      performance: "Excellent"
    },
    {
      id: "STF-011",
      firstName: "Abena",
      lastName: "Darko",
      email: "abena.darko@xy-cargo.com",
      phone: "+233 24 123 4567",
      role: "Cleaner",
      department: "Facilities",
      warehouse: "WH-003",
      warehouseName: "Kumasi Distribution Center",
      status: "Active",
      hireDate: "2023-08-05",
      salary: 1500,
      shift: "Night",
      emergencyContact: {
        name: "Samuel Darko",
        phone: "+233 20 987 6543",
        relationship: "Father"
      },
      skills: ["Cleaning", "Sanitization", "Equipment Maintenance"],
      performance: "Good"
    },
    {
      id: "STF-012",
      firstName: "Kojo",
      lastName: "Mensah",
      email: "kojo.mensah@xy-cargo.com",
      phone: "+233 24 234 5678",
      role: "IT Support",
      department: "IT",
      warehouse: "WH-001",
      warehouseName: "Accra Main Warehouse",
      status: "Active",
      hireDate: "2022-04-18",
      salary: 3500,
      shift: "Day",
      emergencyContact: {
        name: "Esi Mensah",
        phone: "+233 20 876 5432",
        relationship: "Sister"
      },
      skills: ["Technical Support", "System Administration", "Network Troubleshooting"],
      performance: "Excellent"
    }
  ]
};

export default mockStaffData;