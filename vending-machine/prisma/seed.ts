import 'dotenv/config'; // Load env vars
import mysql from 'mysql2/promise';

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
  }

  console.log('Connecting to database...');
  // mysql2 supports 'mysql://user:pass@host:port/db' connection string
  const connection = await mysql.createConnection(databaseUrl);
  
  try {
    console.log('Start seeding ...');

    // Seed Money
    console.log('Deleting existing money data...');
    await connection.execute('DELETE FROM Money');
    
    // Check if we need to reset auto-inc?
    // checking table names: Prisma usually keeps casing unless mapped.
    // If table doesn't exist, this will throw. We assume migrations ran.
    
    const moneyData = [
      ['1', 'COIN', 200],
      ['5', 'COIN', 100],
      ['10', 'COIN', 100],
      ['20', 'BILL', 20],
      ['50', 'BILL', 10],
      ['100', 'BILL', 5],
      ['500', 'BILL', 5],
      ['1000', 'BILL', 5],
    ];

    console.log('Seeding Money...');
    for (const [name, type, amount] of moneyData) {
      await connection.execute(
        'INSERT INTO Money (name, type, amount, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
        [name, type, amount]
      );
    }

    // Seed Products
    console.log('Deleting existing product data...');
    await connection.execute('DELETE FROM Product');
    
    const productData = [
      ['Coke', 15, 20],
      ['Pepsi', 15, 20],
      ['Fanta', 15, 20],
      ['Water', 10, 20],
      ['Green Tea', 20, 20],
      ['Potato Chips', 20, 20],
      ['Chocolate Bar', 25, 20],
    ];

    console.log('Seeding Products...');
    for (const [name, price, quantity] of productData) {
      await connection.execute(
        'INSERT INTO Product (name, price, quantity, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
        [name, price, quantity]
      );
    }
    
    console.log('Seeding finished.');

  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

main();
