require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../app");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

describe("test login controller", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("DB Connected"))
      .catch((err) => {
        console.log(err);
      });
  });

  test("the response must have a status code 200", async () => {
    const response = await request(app).post("/users/login").send({
      email: "Gorec@gor.com",
      password: "111111",
    });

    expect(response.statusCode).toBe(200);
  });

  test("response should return a token", async () => {
    const response = await request(app).post("/users/login").send({
      email: "Gorec@gor.com",
      password: "111111",
    });

    expect(response.body.token).toBeDefined();
  });

  test("response should return a user object with email and subscription as strings", async () => {
    const response = await request(app).post("/users/login").send({
      email: "Gorec@gor.com",
      password: "111111",
    });

    const { user } = response.body;
    expect(typeof user).toBe("object");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("subscription");
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });

  afterAll(async () => {
    await mongoose.disconnect();
    console.log("DB disconnected");
  });
});
