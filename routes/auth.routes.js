const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");

// --------------------- Sign Up ---------------------
router.get("/signup", (req, res, next) =>{
    res.render("sign/signup");
})

router.post("/signup", async(req,res,next)=>{

    try{
        const {username, email, password, ... rest} = req.body;
        
        //double check if email, username and password are being send
        if(!email || !username || !password){
            res.render('sign/signup', {errorMessage: "Please make sure to fill all fields correctly"})
            return
        }

        // double check if password has 1 digit, 1 lowwercase, 1 uppercase and 6 or more chars
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if(!regex.test(password)){
            res.render("sign/signup",{errorMessage:"Please enter a valid passworf (at least 1 digit, 1 lowercase, 1 uppercase and 6 or more characters" })
            return
        }        

        const salt = await bcryptjs.genSaltSync(10)
        const passHash = await bcryptjs.hashSync(password,salt)
        const user = await User.create({username,email,password:passHash })

        //once user is created he should signin
        res.redirect("/signin")
    }
    catch(error){}
})

// --------------------- Sign In ---------------------
router.get("/signin", (req, res, next) =>{
    res.render("sign/signin");
})



module.exports = router;