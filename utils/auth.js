
const isLoggedIn = (req, res, next) => {
    if(!req.session.user){
        return res.redirect("/signin")
    }

    next()
}

const isLoggedOut = (req, res, next) => {
    if(req.session.user){
        return res.redirect("/")
    }

    next()
}

module.exports = {
    isLoggedIn,
    isLoggedOut
}