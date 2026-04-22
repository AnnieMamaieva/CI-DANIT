import client from "./db.js";

const getAll = async () => {
  try {
    await client.connect();
    const result = await client.query("SELECT * FROM newsposts");
    console.log("All news:", result.rows);
  } catch (error) {
    console.error("Error getting data:", error.message);
  } finally {
    await client.end();
  }
};
getAll();
