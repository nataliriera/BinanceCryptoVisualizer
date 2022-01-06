const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/signup", (req, res, next) =>{
  res.render("sign/signup");
})

router.get("/signin", (req, res, next) =>{
  res.render("sign/signin");
})
module.exports = router;
