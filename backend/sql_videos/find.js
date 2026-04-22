import client from "./db.js";

const args = process.argv.slice(2);
const getArg = (name) => {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.split("=")[1] : null;
};
const find = async () => {
  const search = getArg("search");
  try {
    if (!search) {
      console.log("Missing required arguments");
      return;
    }
    await client.connect();
    const result = await client.query(
      "SELECT * FROM videos WHERE title ILIKE  $1",
      [`%${search}%`],
    );
    console.log("Found videos:", result.rows);
  } catch (error) {
    console.error("Error finding data:", error.message);
  } finally {
    await client.end();
  }
};
find();
