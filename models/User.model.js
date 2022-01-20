const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    
    username: {
      type: String,
      unique: true,
      required:[true, "You should set up "]
    },

    password: {
      type: String,
      required: true,
    },

    email:{
      type: String,
      required: true,
      unique:true
    },

    ocupation:{
      type: String,
      required: true,
    },

    profile_picture:{
      type: String,
      default:"https://res.cloudinary.com/dzdovm4uz/image/upload/v1642550134/profile_lknnfm.jpg"
  },
  about_me:{
    type: String,
    min: [10, "Must be at least 10 characters"],
    max: [200, "Must be 200 character max"],
    default: ""
  },

  friends:{
    type: [String]
  },

  hashtags:{
    type: [String]
  }

},
  {
      timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
