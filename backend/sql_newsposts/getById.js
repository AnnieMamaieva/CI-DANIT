import client from "./db.js";

const args = process.argv.slice(2);

const getArg = (name) => {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.split("=")[1] : null;
};

const getById = async () => {
  try {
    const id = Number(getArg("id"));
    if (!id) {
      console.log("Missing required arguments: id");
      return;
    }
    await client.connect();
    const result = await client.query("SELECT * FROM newsposts WHERE id = $1", [
      id,
    ]);
    console.log("Selected by ID:", result.rows[0]);
  } catch (error) {
    console.error("Error getting data:", error.message);
  } finally {
    await client.end();
  }
};

getById();
