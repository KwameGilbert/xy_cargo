# xy_cargo

## Project Overview
xy_cargo is a parcel management system designed to streamline the process of creating, managing, and tracking parcels. The application provides an intuitive interface for both administrators and customers, allowing for efficient parcel handling and monitoring.

## Features
- **Parcel Creation**: Easily create new parcels with detailed information.
- **Parcel Management**: View, edit, and manage existing parcels, including splitting parcels and reassigning customers.
- **Status Tracking**: Monitor the status of parcels through a detailed timeline.
- **Weight and Volume Summary**: Get quick insights into the weight and volume of parcels.
- **Payment Information**: View and update payment statuses for parcels.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/xy_cargo.git
   ```
2. Navigate to the project directory:
   ```
   cd xy_cargo
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.

## File Structure
```
xy_cargo
├── src
│   ├── components
│   │   └── admin
│   │       └── parcels
│   │           ├── AdminParcelDetail.jsx
│   │           ├── CreateAdminParcel.jsx
│   │           ├── ParcelActionsAdmin.jsx
│   │           ├── ParcelCardListAdmin.jsx
│   │           ├── ParcelFiltersAdmin.jsx
│   │           └── ParcelTableAdmin.jsx
│   └── pages
│       └── admin
│           └── parcels
│               ├── AdminAllParcels.jsx
│               ├── AdminParcelDetailPage.jsx
│               └── CreateAdminParcelPage.jsx
└── README.md
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.