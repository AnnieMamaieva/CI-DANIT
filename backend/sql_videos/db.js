import pkg from "pg";

const { Client } = pkg;

const client = new Client({
  user: "annamamaeva",
  host: "localhost",
  database: "videos_db",
  port: 5432,
});

export default client;
