import { Package, DollarSign, CheckCircle, Archive } from 'lucide-react';

const icons = {
  package: Package,
  dollar: DollarSign,
  check: CheckCircle,
  box: Archive
};

const iconColors = {
  package: "text-blue-600",
  dollar: "text-red-600",
  check: "text-green-600",
  box: "text-purple-600"
};

const iconBgColors = {
  package: "bg-blue-50",
  dollar: "bg-red-50",
  check: "bg-green-50",
  box: "bg-purple-50"
};

const DashboardMetric = ({ count, icon, label, currency }) => {
  const IconComponent = icons[icon];
  const iconColor = iconColors[icon];
  const iconBgColor = iconBgColors[icon];

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <h3 className="text-2xl font-bold">
            {currency && <span>{currency}</span>}
            {count}
          </h3>
        </div>
        <div className={`p-2 ${iconBgColor} rounded-full`}>
          {IconComponent && <IconComponent className={`w-5 h-5 ${iconColor}`} />}
        </div>
      </div>
    </div>
  );
};

export default DashboardMetric;
