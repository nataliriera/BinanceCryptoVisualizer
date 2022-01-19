const router = require("express").Router();
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Followers = require("../models/Followers.model");


router.post('/search', async(req,res,next)=>{
    try{
        const {user} = req.session
        const search = req.body.search
        const postResult = await Post.find(
            { "post": { "$regex": search, "$options": "i" } }
        ).sort({'createdAt': -1}).populate('_author')
        const userResult = await User.find(
            { "username": { "$regex": search, "$options": "i" } }, 'email username profile_picture'
        ).sort({'createdAt': -1})
        res.render('searchResult', {user, search, postResult, userResult})
    }
    catch(err){
        next(err)
    }
    
})


router.post('/addFriend', async(req,res,next)=>{
    const _user = req.body.userEmail
    const {user} = req.session

    const _follower = user._id
    
    Followers.create( {
        _user,
        _follower
    })
    
    
})

module.exports = router;