const express = require("express");
const bcrypt = require("bcrypt");
// פונקציה שבודקת שהמשתמש יש לו טוקן תקף
const {auth} = require("../middlewares/auth")
const { validateUser, UserModel, validateLogin, genToken } = require("../models/userModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Users work" })
})


// כדי לעבור לפונקציה הבאה אחרי האוט מצפה לקבל באוט את הפונקציה נקסט
router.get("/userInfo", auth, async (req, res) => {
  // שולף את המידע של המשתמש לפי האיידי שבטוקן
  // 1 -> מייצג רק להציג את המאפיין הנל
  // 0 -> מייצג להציג הכל חוץ מאת המאפיין
  let user = await UserModel.findOne({_id:req.userTokenData._id},{password:0})
  // res.json(req.userTokenData)
  res.json(user)

})

// הרשמה של משתמש חדש
router.post("/", async (req, res) => {
  let validBody = validateUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    // להצפין את הסיסמא רמת הצפנה 10
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    // להסתיר מהצד לקוח את הסיסמא
    user.password = "Hidden Pass ***";
    res.json(user);

  }
  catch (err) {
    // בודק אם הטעות  זה במקרה אימייל שקיים
    if (err.code == 11000) {
      return res.status(500).json({ msg: "Email already in system , try login" })
    }
    console.log(err)
    res.status(500).json(err)
  }
})

router.post("/login", async (req, res) => {
  let validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    // לבדוק אם בכלל יש מתשמש שיש לו את האימייל הזה
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ msg: "Email not found !!" });
    }
    // בודק שהסיסמא שהגיע בבאדי מתאימה לסיסמא של הרשומה שמוצפנת
    let validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
      return res.status(401).json({ msg: "Password or email is worng !!" });
    }
    // מייצר טוקן עם האיי די והשם של המשתמש ומחזיר
    // את זה לצד לקוח
    // בדרך כלל נשמור רק את האיי די
    let newToken = genToken(user._id);
    res.json({ token: newToken });
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router;

