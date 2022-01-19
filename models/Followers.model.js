const {Schema,model} =  require("mongoose");


const followerSchema = new Schema( {
    _user:{
        type:String,
        ref:"User",
        required:true
    },
    _follower:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
} , {
    timestamps:true
})



module.exports = model("Followers",followerSchema)