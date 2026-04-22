import client from "./db.js";

const createTable = async () => {
  try {
    await client.connect();
    await client.query(`
    CREATE TABLE IF NOT EXISTS newsPosts (
      id INTEGER PRIMARY KEY,
      title TEXT,
      text TEXT,
      created_date DATE
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

//  id: Integer, primary key
//   title: Text,
//   text: Text,
//   created_date: Date,

// node sql/createTable.js
