import client from "./db.js";

const args = process.argv.slice(2);
const getArg = (name) => {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.split("=")[1] : null;
};

const insert = async () => {
  try {
    const id = Number(getArg("id"));
    const title = getArg("title");
    const text = getArg("text");

    if (!id || !title || !text) {
      console.log("Missing required arguments: id, title, text");
      return;
    }
    await client.connect();
    const result = await client.query(
      "INSERT INTO newsposts (id ,title, text, created_date) VALUES ($1, $2, $3, CURRENT_DATE) RETURNING *",
      [id, title, text],
    );
    console.log("Inserted:", result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error.message);
  } finally {
    await client.end();
  }
};
insert();
