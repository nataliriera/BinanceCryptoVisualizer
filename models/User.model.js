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

    profile_picture:{
      type: String,
      //default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pikpng.com%2Fpngvi%2FiibRox_user-iconset-no-profile-picture-icon-circle-clipart%2F&psig=AOvVaw2mdXUT5r-4kq0wMKBNLyYV&ust=1641739777970000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNii0rizovUCFQAAAAAdAAAAABAJ"
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
