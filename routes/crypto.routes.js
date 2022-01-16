// const { default: axios } = require("axios");

const router = require("express").Router();

/* GET home page */
router.get("/cryptos", (req, res, next) => {
    res.render("cryptoindex.hbs");
    
});



module.exports = router;
