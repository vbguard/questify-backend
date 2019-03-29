const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CONFIG = require("../../config/config");

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, "Nickname is required."],
      unique: true
    },
    shortNickname: {
      type: String
    },
    questsID: {
      type: String
    },
    challengesID: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSalt(10), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.getJWT = function() {
  let expiration_time = parseInt(CONFIG.jwt_expiration);
  return (
    "JWT " +
    jwt.sign(
      {
        user_id: this._id
      },
      CONFIG.jwt_encryption,
      {
        expiresIn: expiration_time
      }
    )
  );
};

UserSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id; //this is for the front end
  return json;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
