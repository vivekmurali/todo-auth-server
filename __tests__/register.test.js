const fetch = require("node-fetch");

const body = {
  email: "testregister",
  password: "testregister",
};

test("Register user test", () => {
  return fetch("http://localhost:3000/register", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then((res) => {
      expect(res).toBe("User already exists");
    });
});
