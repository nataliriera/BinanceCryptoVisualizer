const router = require("express").Router();
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const bcryptjs = require("bcryptjs");
const {isLoggedOut,isLoggedIn} = require("../utils/auth");
const mongoose = require('mongoose');
const uploader = require('../helpers/multer');
const { redirect } = require("express/lib/response");

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
            res.render("sign/signup",{errorMessage:"Please enter a valid password (at least 1 digit, 1 lowercase, 1 uppercase and 6 or more characters" })
            return
        }        

        const salt = await bcryptjs.genSaltSync(10)
        const passHash = await bcryptjs.hashSync(password,salt)
        const user = await User.create({username,email,password:passHash })

        //once user is created he should signin
        res.redirect("/signin")
    }
    catch(error){
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render("sign/signup", { errorMessage: error.message });
        } else if (error.code === 11000) {
            res.status(500).render("sign/signup", {
                errorMessage: "Email/Username already exist"
            });
        } else {
            next(error);
        }
    }
})

// --------------------- Sign In ---------------------
router.get("/signin", isLoggedOut, (req, res, next) =>{
    res.render("sign/signin");
})

router.post("/signin", async(req, res, next) => {
    try{
        const {email, password, ... rest} = req.body;
        if(!email || !password){
            res.render("sign/signin",{errorMessage:"Please make sure to fill all fields correctly"})
            return
        }

        const user = await User.findOne({email})
        console.log(user)
        if(!user){
            res.render("sign/signin",{errorMessage:"Email and/or Password are incorrect"})
            return
        }

        if(bcryptjs.compareSync(password,user.password)){
            req.session.user = user 
            res.redirect("/profile")
        }else{
            res.render("sign/signin",{errorMessage:"Email and/or Password are incorrect"})
            return
        }

    }
    catch(error){
        next(error)
    }

})

// --------------------- Profile ---------------------
router.get("/profile", isLoggedIn, (req, res, next) => {
    const {user} = req.session
    Post.find({_author: user}).sort({'createdAt': -1})
        .then(thePosts => {
            console.log(user)
            res.render("profile",{user, posts:thePosts})
        })
        .catch(error =>{
            next(error)
        })
    })

router.get("/logout",  (req, res, next) => {
    req.session.destroy();
    res.redirect("/")
    });

// PROFILE SETTINGS
router.post("/profilesettings", uploader.single('profile_picture'), (req, res, next) =>{
    let {user} = req.session
    let data = {...req.body}
    if(req.file){
        data.profile_picture = req.file.path
    }
    User.findByIdAndUpdate(user._id, data, {
        new:true
    })
    .then(thePosts => {
        req.session.user = thePosts
        res.redirect("/profile")
    })
    .catch(error =>{
        next(error)
    })
})

    // profile settings
router.get("/profilesettings", isLoggedIn, (req, res, next) =>{
    const {user} = req.session
    res.render("profilesettings", {user})
})

module.exports = router;