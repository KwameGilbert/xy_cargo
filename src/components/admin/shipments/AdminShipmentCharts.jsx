import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const AdminShipmentCharts = ({ shipments }) => {
  // Process shipments data into chart format
  const chartData = React.useMemo(() => {
    if (!shipments || shipments.length === 0) {
      return {
        statusDistribution: [],
        weeklyShipmentTrend: [],
        carrierPerformance: []
      };
    }

    // Status distribution
    const statusCounts = {};
    shipments.forEach(shipment => {
      statusCounts[shipment.status] = (statusCounts[shipment.status] || 0) + 1;
    });

    const statusColors = {
      'Delivered': '#10B981',
      'In Transit': '#3B82F6',
      'Pending': '#F59E0B',
      'Processing': '#8B5CF6',
      'Delayed': '#EF4444',
      'Cancelled': '#6B7280'
    };

    const statusDistribution = Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
      color: statusColors[status] || '#6B7280'
    }));

    // Weekly shipment trend (simplified - group by week)
    const weeklyData = {};
    shipments.forEach(shipment => {
      const date = new Date(shipment.departureDate);
      const weekKey = `${date.getFullYear()}-W${Math.ceil((date.getDate() - date.getDay() + 1) / 7)}`;
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = { date: weekKey, count: 0, revenue: 0 };
      }
      weeklyData[weekKey].count += 1;
      weeklyData[weekKey].revenue += parseFloat(shipment.shippingCost) || 0;
    });

    const weeklyShipmentTrend = Object.values(weeklyData).sort((a, b) => a.date.localeCompare(b.date));

    // Carrier performance
    const carrierData = {};
    shipments.forEach(shipment => {
      if (!carrierData[shipment.carrier]) {
        carrierData[shipment.carrier] = {
          name: shipment.carrier,
          shipments: 0,
          onTime: 0,
          totalCost: 0
        };
      }
      carrierData[shipment.carrier].shipments += 1;
      carrierData[shipment.carrier].totalCost += parseFloat(shipment.shippingCost) || 0;
      if (shipment.status === 'Delivered') {
        carrierData[shipment.carrier].onTime += 1;
      }
    });

    const carrierPerformance = Object.values(carrierData).map(carrier => ({
      name: carrier.name,
      shipments: carrier.shipments,
      onTime: carrier.shipments > 0 ? Math.round((carrier.onTime / carrier.shipments) * 100) : 0,
      avgCost: carrier.shipments > 0 ? Math.round(carrier.totalCost / carrier.shipments) : 0
    }));

    return {
      statusDistribution,
      weeklyShipmentTrend,
      carrierPerformance
    };
  }, [shipments]);

  const { statusDistribution, weeklyShipmentTrend, carrierPerformance } = chartData;

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-blue-600">Count: {data.value}</p>
          <p className="text-gray-600">
            Percentage: {((data.value / statusDistribution.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for bar chart
  const CarrierTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-blue-600">Shipments: {payload[0].value}</p>
          <p className="text-green-600">On-time: {payload[1].value}%</p>
          <p className="text-purple-600">Avg Cost: ${payload[2].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Status Distribution Pie Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Shipment Trend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Shipment Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyShipmentTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                name === 'count' ? `${value} shipments` : `$${value.toLocaleString()}`,
                name === 'count' ? 'Shipments' : 'Revenue'
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Shipments"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={2}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Carrier Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Carrier Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={carrierPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CarrierTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="shipments" fill="#3B82F6" name="Shipments" />
            <Bar yAxisId="right" dataKey="onTime" fill="#10B981" name="On-time %" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {carrierPerformance.map((carrier, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">{carrier.name}</p>
              <p className="text-sm text-gray-600">Avg Cost: ${carrier.avgCost}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminShipmentCharts;