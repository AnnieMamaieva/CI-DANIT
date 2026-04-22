import client from "./db.js";

const args = process.argv.slice(2);
const getArg = (name) => {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.split("=")[1] : null;
};

const insert = async () => {
  const id = Number(getArg("id"));
  const title = getArg("title");
  const views = Number(getArg("views"));
  const category = getArg("category");
  try {
    if (!title || !id || !views || !category) {
      console.log("Missing required arguments");
      return;
    }
    await client.connect();
    const result = await client.query(
      "INSERT INTO videos (id, title, views, category) VALUES ($1, $2, $3, $4 ) RETURNING *",
      [id, title, views, category],
    );
    console.log("Inserted:", result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error.message);
  } finally {
    await client.end();
  }
};

insert();
