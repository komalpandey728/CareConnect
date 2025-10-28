// createAdmin.js
// Run: node createAdmin.js
require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('Set MONGO_URI in .env and re-run.');
  process.exit(1);
}

async function createAdmin() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('careconnect'); // change DB name if you want
    const admins = db.collection('admins');

    const adminEmail = 'admin@careconnect.com'; // change to the admin email you want
    const plainPassword = 'StrongAdminPassword123!'; // change to the password you want

    // Check if admin already exists
    const exists = await admins.findOne({ email: adminEmail });
    if (exists) {
      console.log('Admin already exists. Aborting.');
      return;
    }

    const saltRounds = 12;
    const hash = await bcrypt.hash(plainPassword, saltRounds);

    const doc = {
      email: adminEmail,
      passwordHash: hash,
      createdAt: new Date(),
      role: 'admin'
    };

    const res = await admins.insertOne(doc);
    console.log('Admin created, id:', res.insertedId);
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    await client.close();
  }
}

createAdmin();
