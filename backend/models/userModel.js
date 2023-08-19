const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// custom signup method
// can't use arrow function here bcoz we r using "this" keyword
userSchema.statics.signup = async function (email, password) {
  // check if email already exist - to send back a response

  // "this" here refers to the model.We don't have User right now.
  // if exists value else null
  const exists = await this.findOne({ email });

  if (exists) {
    // we can't use res here because we don't have access to response right now.
    throw Error("Email already in use");
  }

  // to hash password use a package called bcrypt
  // bcrypt also forces us to use something called salt when we are hashing the password - salt is a random string of characters that gets added to the password before it gets hashed to add a little bit more security.
  // also it makes sure not 2 passwords are the same so that hackers can't match and decode faster

  // to generate salt
  const salt = await bcrypt.genSalt(10);

  // to hash with password
  const hash = await bcrypt.hash(password, salt);

  // to create document
  const user = await this.create({ email, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
