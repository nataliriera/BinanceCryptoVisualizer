const {Schema,model} =  require("mongoose");


const postSchema = new Schema( {
    _author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    post:{
        type:Text,
        required:true
    }
} , {
    timestamps:true
} )



module.exports = model("Post",postSchema)