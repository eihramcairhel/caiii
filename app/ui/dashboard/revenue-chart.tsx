import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

// Make the component async to fetch data
export default async function RevenueChart() {
  // Fetch data inside the component
  const revenue = await fetchRevenue();

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  // Render your chart with the fetched data
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white rounded-lg shadow-md">
      <div className="p-4">
        <h2 className={`${lusitana.className} text-lg font-bold`}>Revenue Chart</h2>
        <div className="mt-4">
          {/* Render your chart here using the data */}
          {/* Example: */}
          {/* <Chart data={revenue} height={chartHeight} yAxisLabels={yAxisLabels} topLabel={topLabel} /> */}
          {/* Replace the above with actual chart rendering logic */}
        </div>
      </div>
    </div>
  );
}
