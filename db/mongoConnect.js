const mongoose = require("mongoose");
const { config } = require("../config/secret");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${config.userDb}:${config.passDb}@cluster0.jtw8z.mongodb.net/nov21`
  );
  console.log("mongo connected!!!");
}
