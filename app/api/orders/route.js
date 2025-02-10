import mysql from 'mysql2/promise';

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Get query parameters from the URL
  const date = searchParams.get('date'); // Get the 'date' parameter

  if (!date) {
    return new Response(
      JSON.stringify({ message: 'Date parameter is required' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }

  const connection = await mysql.createConnection({
    host: 'localhost',    // Database host (usually 'localhost' for XAMPP)
    user: 'root',         // Database user (default for XAMPP)
    password: '',         // Database password (default is empty for XAMPP)
    database: 'orders_db', // Replace with your database name
  });

  try {
    // Query to fetch orders for the specified date
    const [rows] = await connection.execute(
      `SELECT * FROM orders WHERE DATE(dispensed_date) = ?`,
      [date] // Use the provided date in the query
    );

    // Query to count the number of orders for the specified date
    const [countRows] = await connection.execute(
      'SELECT COUNT(*) AS orderCount FROM orders WHERE DATE(dispensed_date) = ?',
      [date] // Count orders for the given date
    );

    // Query to count number of re-dispensed orders
    const [countReDisp] = await connection.execute(
      'SELECT COUNT(*) AS orderReCount FROM orders WHERE redispense = 1 AND DATE(dispensed_date) = ?',
      [date] // Count orders for the given date
    );
    
    // Get the total count from the result
    const orderCount = countRows[0].orderCount;
    const orderReCount = countReDisp[0].orderReCount;

    return new Response(
      JSON.stringify({ orders: rows, totalOrders: orderCount, totalReOrders: orderReCount }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Database error', error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  } finally {
    await connection.end();
  }
}
