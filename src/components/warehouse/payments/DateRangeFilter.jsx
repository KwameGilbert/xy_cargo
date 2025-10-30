import React from 'react';
import { Select } from '@radix-ui/react-select';
import { Button } from '@radix-ui/themes';

const DateRangeFilter = ({ period, onPeriodChange, onCustomDateChange }) => {
  const [showCustomRange, setShowCustomRange] = React.useState(false);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const handlePeriodChange = (value) => {
    setShowCustomRange(value === 'custom');
    onPeriodChange(value);
  };

  const handleCustomDateSubmit = () => {
    if (startDate && endDate) {
      onCustomDateChange(startDate, endDate);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <Select
        value={period}
        onValueChange={handlePeriodChange}
        className="min-w-[150px]"
      >
        <Select.Trigger className="inline-flex items-center justify-between px-4 py-2 text-sm border rounded-md">
          <Select.Value placeholder="Select period" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Item value="daily">Today</Select.Item>
            <Select.Item value="weekly">Last 7 Days</Select.Item>
            <Select.Item value="monthly">Last 30 Days</Select.Item>
            <Select.Item value="custom">Custom Range</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>

      {showCustomRange && (
        <div className="flex gap-4 items-center">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 text-sm border rounded-md"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 text-sm border rounded-md"
          />
          <Button 
            onClick={handleCustomDateSubmit}
            disabled={!startDate || !endDate}
            className="bg-red-600 text-white"
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;