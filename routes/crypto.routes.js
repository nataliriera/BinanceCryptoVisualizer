// const { default: axios } = require("axios");

const router = require("express").Router();

/* GET home page */
router.get("/cryptos", (req, res, next) => {
    const {user} = req.session
    res.render("cryptoindex.hbs", {user});
    
});



module.exports = router;
