const router = require("express").Router();



/* GET top 100 */
router.get("/top", (req, res, next) => {
  res.render("top");
});


module.exports = router;