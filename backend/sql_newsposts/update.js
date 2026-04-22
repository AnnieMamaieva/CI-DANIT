import client from "./db.js";

const args = process.argv.slice(2);
const getArg = (name) => {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.split("=")[1] : null;
};

const update = async () => {
  const id = Number(getArg("id"));
  const title = getArg("title");
  const text = getArg("text");
  try {
    if (!id || !title || !text) {
      console.log("Missing required arguments: id, title, content");
      return;
    }
    await client.connect();
    const result = await client.query(
      "UPDATE newsposts SET title = $1, text = $2 WHERE id = $3 RETURNING *",
      [title, text, id],
    );
    console.log("Updated:", result.rows[0]);
  } catch (error) {
    console.error("Error updating data:", error.message);
  } finally {
    await client.end();
  }
};

update();
