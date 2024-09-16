import { generateYAxis } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white rounded-lg shadow-md">
      <div className="p-4">
        <h2 className={`${lusitana.className} text-lg font-bold`}>Revenue Chart</h2>
        <div className="mt-4">
          {/* Render your chart here using the data */}
          {/* Example chart rendering logic */}
          {/* Replace this with your actual chart component and logic */}
          <div style={{ height: chartHeight, background: '#f0f0f0' }}>
            {/* Placeholder for the actual chart */}
            <p className="text-center text-gray-600">Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
