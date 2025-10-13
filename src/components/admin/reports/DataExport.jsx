import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, File, RefreshCw } from 'lucide-react';

const DataExport = ({
  data,
  filename = 'report',
  onExport,
  formats = ['csv', 'excel', 'pdf'],
  disabled = false
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(formats[0]);

  const formatOptions = {
    csv: { label: 'CSV', icon: FileText, mime: 'text/csv' },
    excel: { label: 'Excel', icon: FileSpreadsheet, mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    pdf: { label: 'PDF', icon: File, mime: 'application/pdf' }
  };

  const handleExport = async (format) => {
    if (disabled || isExporting) return;

    setIsExporting(true);
    try {
      if (onExport) {
        await onExport(format, filename);
      } else {
        // Default export logic
        await exportData(data, format, filename);
      }
    } catch (error) {
      console.error('Export failed:', error);
      // In a real app, you might show a toast notification here
    } finally {
      setIsExporting(false);
    }
  };

  const exportData = async (data, format, filename) => {
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    let content = '';
    let mimeType = '';
    let extension = '';

    switch (format) {
      case 'csv':
        content = convertToCSV(data);
        mimeType = 'text/csv';
        extension = 'csv';
        break;
      case 'excel':
        // In a real app, you'd use a library like xlsx
        content = convertToCSV(data);
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        extension = 'xlsx';
        break;
      case 'pdf':
        // In a real app, you'd use a library like jsPDF
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/pdf';
        extension = 'pdf';
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    // Create and download file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const convertToCSV = (data) => {
    if (!data || !Array.isArray(data)) return '';

    const headers = Object.keys(data[0] || {});
    const csvRows = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes in CSV
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value || '';
        }).join(',')
      )
    ];

    return csvRows.join('\n');
  };

  return (
    <div className="flex items-center gap-3">
      {formats.length > 1 && (
        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
          disabled={isExporting}
        >
          {formats.map((format) => {
            const option = formatOptions[format];
            return (
              <option key={format} value={format}>
                {option.label}
              </option>
            );
          })}
        </select>
      )}

      <button
        onClick={() => handleExport(selectedFormat)}
        disabled={disabled || isExporting}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
      >
        {isExporting ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {isExporting ? 'Exporting...' : 'Export'}
      </button>
    </div>
  );
};

export default DataExport;