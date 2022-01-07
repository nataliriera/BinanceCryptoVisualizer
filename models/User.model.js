const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    
    username: {
      type: String,
      unique: true,
      required:[true, "You should set up "]
      // unique: true -> Ideally, should be unique, but its up to you
    },

    password: {
      type: String,
      required: true,
    },

    email:{
      type: String,
      required: true,
    },

    profile_picture:{
      type: String,
    //default:"http...."
  }
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
