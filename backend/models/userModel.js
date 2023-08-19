const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // check if email already exist - to send back a response

  // "this" here refers to the model.We don't have User right now.
  // if exists value else null
  const exists = await this.findOne({ email });

  // if user already exists throw error
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

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // try to find user in the db
  // if exists value else null
  const user = await this.findOne({ email });

  if (!user) {
    // we can't use res here because we don't have access to response right now.
    throw Error("Incorrect email");
  }
  // match the hashed password in db

  // returns true/false
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
