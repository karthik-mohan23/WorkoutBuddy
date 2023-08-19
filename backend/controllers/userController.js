const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// custom function to generate token
const createToken = (_id) => {
  // (1.payload,2.secret string only known to server - so .env,3.options)
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  res.json({ message: "login user" });
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // after we have saved user to the db create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
