const fs = require('fs');
const { Pool } = require('pg');
const csv = require('csv-parser');

// Neon DB connection
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_z9RCmAenVB0c@ep-wild-butterfly-a106ho3j-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: true,
});

// Utility: Clean and sanitize values
const sanitize = (val, type = 'string') => {
  if (val === undefined || val === null || val === '' || val === 'NaN') return null;
  if (type === 'number') return isNaN(Number(val)) ? null : Number(val);
  if (type === 'boolean') return val.toLowerCase() === 'yes' || val === '1';
  return val;
};

// Insert sanitized data
const insertData = async (row) => {
  const sanitized = {
    step: sanitize(row.step, 'number'),
    customer: sanitize(row.customer),
    age: sanitize(row.age, 'number'),
    gender: sanitize(row.gender),
    zipcodeOri: sanitize(row.zipcodeOri),
    merchant: sanitize(row.merchant),
    zipMerchant: sanitize(row.zipMerchant),
    category: sanitize(row.category),
    amount: sanitize(row.amount, 'number'),
    fraud: sanitize(row.fraud, 'boolean'),
  };

  // Optional: Skip row if essential fields are missing
  if (sanitized.step === null || sanitized.customer === null || sanitized.amount === null) {
    console.warn('⚠️ Skipping row with missing critical fields:', sanitized);
    return;
  }

  const query = `
    INSERT INTO fraud_data (
      step, customer, age, gender,
      zipcodeOri, merchant, zipMerchant,
      category, amount, fraud
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;

  const values = [
    sanitized.step,
    sanitized.customer,
    sanitized.age,
    sanitized.gender,
    sanitized.zipcodeOri,
    sanitized.merchant,
    sanitized.zipMerchant,
    sanitized.category,
    sanitized.amount,
    sanitized.fraud,
  ];

  try {
    await pool.query(query, values);
  } catch (err) {
    console.error('❌ Insert error:', err.message, '\nRow:', sanitized);
  }
};

// Start reading the CSV file
const filePath = 'Dataset.csv';

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', async (row) => {
    await insertData(row);
  })
  .on('end', () => {
    console.log('✅ CSV upload completed.');
    pool.end();
  })
  .on('error', (err) => {
    console.error('❌ Error reading CSV file:', err);
  });
