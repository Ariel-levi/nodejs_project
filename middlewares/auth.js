const jwt = require("jsonwebtoken");

// middleware - פונקציית אמצע שבודקת אוטנקציה של המשתמש מחובר
// const auth = (req, res, next) => {
exports.auth = (req, res, next) => {
  // בודק אם בכלל נשלח טוקן מהצד לקוח
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You must send Token to this end point" })
  }
  try {
    // מנסה לתרגם את הטוקן ההפך מקידוד ולשלוף את המידע במקרה שלנו את האיי די, אם לא מצליח קופץ לטעות קצ
    let decodToken = jwt.verify(token, "ariel1234");
    // req -> פרמטר של אובייקט שזהה בכל הפונקציות בשרשור
    // ואם נייצר לו מאפיין הוא יהיה קיים גם בפונקציה הבאה בשרשור
    req.userTokenData = decodToken;
    // עובר לפונקציה הבאה בשרשור של הראוטר
    next();
  }
  catch (err) {
    // במקרה של בדיקת טוקן אם יש טעון בדיקוד
    // של טוקן לא תקין או לא תקף הוא קופץ לקצ
    console.log(err)
    res.status(401).json({ msg: "Token invalid or expired" })
  }
}