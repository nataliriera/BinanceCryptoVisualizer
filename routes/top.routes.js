const router = require("express").Router();



/* GET top 100 */
router.get("/top", (req, res, next) => {
  const {user} = req.session
  res.render("top", {user});
});


module.exports = router;