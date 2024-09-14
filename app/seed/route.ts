export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    await client.sql`COMMIT`;

    return new Response(JSON.stringify({ message: 'Database seeded successfully' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Type guard to ensure `error` is an instance of `Error`
    if (error instanceof Error) {
      await client.sql`ROLLBACK`;
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // Fallback for unknown error types
      await client.sql`ROLLBACK`;
      return new Response(JSON.stringify({ error: 'Unknown error occurred' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
