import client from "./db.js";

const group = async () => {
  try {
    await client.connect();
    const result = await client.query(`
    SELECT category, SUM(views) AS total_views
    FROM videos
    GROUP BY category;
    `);
    console.log("Grouped data:", result.rows);
  } catch (error) {
    console.error("Error grouping data:", error.message);
  } finally {
    await client.end();
  }
};
group();

// SELECT category, SUM(views) AS total_views
// FROM videos
// GROUP BY category;
