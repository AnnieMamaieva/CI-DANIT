import request from "supertest";
import app from "../../app.js";
import AppDataSource from "../../db/data_source.js";

describe("Auth API", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  beforeEach(async () => {
    await AppDataSource.query(
      'TRUNCATE TABLE "newsposts" RESTART IDENTITY CASCADE',
    );
    await AppDataSource.query(
      'TRUNCATE TABLE "users" RESTART IDENTITY CASCADE',
    );
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  test("POST /auth/register should create user", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "test@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("POST /auth/register should fail if user exists", async () => {
    await request(app).post("/auth/register").send({
      email: "test@test.com",
      password: "password123",
    });

    const res = await request(app).post("/auth/register").send({
      email: "test@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
  });

  test("POST /auth/login should login user", async () => {
    await request(app).post("/auth/register").send({
      email: "test@test.com",
      password: "password123",
    });

    const res = await request(app).post("/auth/login").send({
      email: "test@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
