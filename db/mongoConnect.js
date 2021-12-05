const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://localhost:27017/yad2');
  // כדי להתחבר לשרת האמיתי הקוד שלקחנו ממונגו אטלס
  // await mongoose.connect('mongodb+srv://koko10:MONKEYS12212@cluster0.jqikq.mongodb.net/nov21');
  await mongoose.connect(
    "mongodb+srv://ariel:ariel1234@cluster0.jtw8z.mongodb.net/nov21"
  );
  console.log("mongo connected!!!");
}
