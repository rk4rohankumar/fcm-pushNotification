import Dexie from 'dexie';

// Define the database schema
const db = new Dexie('MyDatabase');

// Define the tables and their indexes
db.version(1).stores({
  items: '++id, name, description,image', // Auto-incrementing ID, and other fields
});

export default db;
