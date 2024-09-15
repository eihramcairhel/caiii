'use client';

import React, { Suspense } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';

// Fallback skeleton component
function LatestInvoicesSkeleton() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          <p>Loading invoices...</p>
        </div>
      </div>
    </div>
  );
}

// Function to fetch data
const fetchLatestInvoicesData = () => {
  return fetchLatestInvoices().then((invoices) => ({ invoices }));
};

// Component that handles data fetching and displaying
function LatestInvoicesContent() {
  const [data, setData] = React.useState<{ invoices: any[] } | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    fetchLatestInvoicesData()
      .then((data) => setData(data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>Error loading invoices</div>;
  }

  if (!data) {
    return null; // Render nothing while data is loading
  }

  const { invoices } = data;

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {invoices.map((invoice, i) => (
            <div
              key={invoice.id}
              className={clsx(
                'flex flex-row items-center justify-between py-4',
                {
                  'border-t': i !== 0,
                },
              )}
            >
              <div className="flex items-center">
                <Image
                  src={invoice.image_url}
                  alt={`${invoice.name}'s profile picture`}
                  className="mr-4 rounded-full"
                  width={32}
                  height={32}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">{invoice.name}</p>
                  <p className="hidden text-sm text-gray-500 sm:block">{invoice.email}</p>
                </div>
              </div>
              <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                {invoice.amount}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}

export default function LatestInvoices() {
  return (
    <Suspense fallback={<LatestInvoicesSkeleton />}>
      <LatestInvoicesContent />
    </Suspense>
  );
}
