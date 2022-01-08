const router = require("express").Router();
const Post = require("../models/Post.model")
const Upload = require("../helpers/multer")

router.get("/create",  (req, res, next) => {
    res.redirect("/profile")
    });

router.post("/create",Upload.array("images"), (req, res, next) => {

    const _author = req.session.user._id

    const {post,hashtags, ...rest}= req.body

    const images = req.files.map(file=> file.path)

    Post.create( {
        _author,
        post,
        images,
        hashtags
    })
    .then(post=> res.redirect("/profile") )
    .catch(error=>next(error))
});

module.exports = router;