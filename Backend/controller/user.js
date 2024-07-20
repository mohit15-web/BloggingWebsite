const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email.includes("@")) {
    return next(new Error("Email should contain @"));
  }

  if (password.length < 8) {
    return next(new Error("Password should be at least 8 characters long"));
  }

  if (!containsUppercase(password)) {
    return next(
      new Error("Password should contain at least one uppercase letter")
    );
  }

  if (!containsSpecialCharacter(password)) {
    return next(
      new Error("Password should contain at least one special character")
    );
  }

  if (!containsNumericCharacter(password)) {
    return next(
      new Error("Password should contain at least one numeric character")
    );
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  req.body.password = hashedPassword;
  try {
    let newlyCreatedUser = await userSchema.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log(newlyCreatedUser);
    res.json({
      success: true,
      message: "Signup Successful, please login",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};

const login = async (req, res) => {
  const user = await userSchema.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }
  const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
  const expiryTimeInSeconds = currentTimeInSeconds + 3600; // 1hr from now

  const token = jwt.sign({ email: user.email, id: user._id , exp: expiryTimeInSeconds }, "MY_SECRET_KEY");

  await userSchema.findByIdAndUpdate(user._id, { $set: { token } });

  try {
    res.json({
      success: true,
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Login Failed",
    });
  }
};

const userController = {
  signup,
  login,
};

module.exports = userController;

function containsUppercase(str) {
  const regex = /[A-Z]/;
  return regex.test(str);
}

function containsSpecialCharacter(str) {
  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  return regex.test(str);
}

function containsNumericCharacter(str) {
  const regex = /\d/;
  return regex.test(str);
}
