const express = require("express");
const { auth } = require("../middlewares/auth");
const { ToyModel, validateToy } = require("../models/toyModel");
const router = express.Router();

//?s=
//?perPage= כמה להציג בעמוד
//?page= מספר עמוד ונפיל אותו בפר פייג'
//?sort= לפי מה למיין את הרשימה

// http://localhost:3000/toys/?page=1&perPage=1
// http://localhost:3000/toys/?page=1&sort=price
// http://localhost:3000/toys/?page=1&sort=price&r=yes from the big price to the lower
router.get("/", async(req,res) => {
    try{
      let perPage = req.query.perPage || 10;
      let page = (req.query.page >= 1) ? req.query.page - 1: 0; 
      // "_id" -> ברירת מחדל אם במקרה לא שלחו סורט לפי מה למיין
      let sort = req.query.sort || "_id";
      let reverse = (req.query.r == "yes") ? -1 : 1
      let searchQ = req.query.s;
      let query 
      if(!searchQ){
        query = {}
      }
      else{
        let searcRegX = new RegExp(searchQ, "i")
        query = {$or:[{name:searcRegX},{info:searcRegX}]}
      }
      let data = await ToyModel.find(query)
      .limit(Number(perPage))
      .skip(page * perPage)
      .sort({[sort]:reverse});
      res.json(data)
    } catch(err){
      console.log(err)
      res.status(500).json({err:"Page and perPage must be 1+ or DB down , come back later"})
    }
})
  
// http://localhost:3000/toys/cat/lego
router.get("/cat/:catname", async(req,res) => {
    try{
        let perPage = req.query.perPage || 10;
        let page = req.query.page || 1;  
        let catname = req.params.catname;
        let searcRegX = new RegExp(catname, "i")
        let data = await ToyModel.find({category: searcRegX}).limit(Number(perPage)).skip((page-1) * perPage);
        res.json(data);
    } catch(err){
      console.log(err)
      res.status(500).json({err:"Page and perPage must be 1+ or DB down , come back later"})
    }
})

// http://localhost:3000/toys/prices/?min=25&max=50
router.get("/prices", async(req,res) => {
    try{
        let max = req.query.max || 9999;
        let min = req.query.min || 0;
        let data = await ToyModel.find({$and: [{ price: { $lte: max } }, { price: { $gte: min } }]});
        res.json(data);
    } catch(err){
      console.log(err)
      res.status(500).json({err:"DB down , come back later"})
    }
})

// הוספת צעצוע - POST
router.post("/", auth , async(req,res) => {
  // בדיקה שהריקוייסט באדי תקין /ולדזציה
  let validBody = validateToy(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let toy = new ToyModel(req.body);
    // הוספת מאפיין איי די של משתמש מהטוקן באוט
    toy.user_id = req.userTokenData._id;
    await toy.save();
    res.status(201).json(toy);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

// מחיקת צעצוע - DELETE
router.delete("/:delId",auth , async(req,res) => {
  let delId = req.params.delId;
  try{
    // כדי לוודא שהמשתמש מוחק רשומה שלו ולא בטעות של משתמש 
    // אחר אנחנו גם בודקים שברשומה היוזר איי די שווה לאיי די
    // שבטוקן
    let data = await ToyModel.deleteOne({_id:delId,user_id:req.userTokenData._id});
    // deletedCount -> 1 אומר שהצליח למחוק
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

// עריכת צעצוע - PUT
router.put("/:editId",auth,async(req,res) => {
  let validBody = validateToy(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let editId = req.params.editId
    // דואג בשאילתא שהמשתמש יוכל לערוך רק רשומה שלו ולא של משתמשים אחרים
    let data = await ToyModel.updateOne({_id:editId,user_id:req.userTokenData._id},req.body)
   // modifiedCount //  -> 1 אומר שהצליח לעדכן
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;