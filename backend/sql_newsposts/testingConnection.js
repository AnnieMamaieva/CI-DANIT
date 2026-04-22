import client from "./db.js";

const testingConnection = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");
    const result = await client.query("SELECT NOW()");
    console.log("Current time from DB:", result.rows);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await client.end();
  }
};
testingConnection();

export default testingConnection;
