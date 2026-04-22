import client from "./db.js";

const createTable = async () => {
  try {
    await client.connect();
    await client.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY,
      title TEXT,
      views FLOAT4,
      category TEXT
    );
    `);
    console.log("Table created successfully");
  } catch (error) {
    console.error("Error creating table:", error.message);
  } finally {
    await client.end();
  }
};
createTable();

// id: Integer, primary key
//   title: Text,
//   views: Float4,
//   category: Text,
