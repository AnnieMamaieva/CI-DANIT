import client from "./db.js";

const args = process.argv.slice(2);

const getArg = (name) => {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.split("=")[1] : null;
};

const paginate = async () => {
  try {
    const page = Number(getArg("page"));
    const size = Number(getArg("size"));

    if (!page || !size) {
      console.log("Missing required arguments: page, size");
      return;
    }

    const offset = (page - 1) * size;

    await client.connect();

    const result = await client.query(
      "SELECT * FROM videos ORDER BY id LIMIT $1 OFFSET $2",
      [size, offset],
    );

    console.log("Paginated videos:");
    console.log(result.rows);
  } catch (error) {
    console.error("Error paginating videos:", error.message);
  } finally {
    await client.end();
  }
};

paginate();
