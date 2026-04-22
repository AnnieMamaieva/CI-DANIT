import client from "./db.js";
const args = process.argv.slice(2);

const getArg = (name) => {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.split("=")[1] : null;
};

const deleteById = async () => {
  try {
    const id = Number(getArg("id"));
    if (!id) {
      console.log("Missing required arguments: id");
      return;
    }
    await client.connect();
    const result = await client.query(
      "DELETE FROM newsposts WHERE id = $1 RETURNING *",
      [id],
    );
    console.log("Deleted:", result.rows[0]);
  } catch (error) {
    console.error("Error deleting data:", error.message);
  } finally {
    await client.end();
  }
};

deleteById();
