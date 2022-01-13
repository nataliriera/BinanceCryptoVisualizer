const { default: axios } = require("axios");

const router = require("express").Router();

/* GET home page */
router.get("/cryptos", (req, res, next) => {
    if(req.query.coin){
        const getData = async () =>{
            try{
                const resp = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${req.query.coin}&interval=1h`)
                console.log("respuesta", resp.data)
            } catch(err){
                console.log("error", err)
            } 
        }
        getData()
        
    }
    res.render("cryptoindex.hbs");
});



module.exports = router;
