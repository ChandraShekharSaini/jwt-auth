import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import errorHandler from "../utilis/error.js";

export const postSignup = async (req, res, next) => {
  console.log(req.body.password);
  const { username, password, email } = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    let newUser = await User.create({
      username,
      password: hashPassword,
      email,
    });

    res
      .status(200)
      .json({ message: "User created successfully", newUser: newUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};



export const postLogin = async (req, res, next) => {
  const {email, password } = req.body;
  
 console.log(req.body.email);

  try {
    let ValidUser = await User.findOne({ email });
    console.log(ValidUser);
    if (!ValidUser) return next(errorHandler(404, "Unotherised"));

    const Validpassword = bcrypt.compareSync(password, ValidUser.password);
    if (!Validpassword) return next(errorHandler(401, "Wrong credentials!"));

    const token = jwt.sign({ id: ValidUser._id }, process.env.JWT_SECRET);

    console.log("token:",token);

      ValidUser.token = token;
      await ValidUser.save();

    const { password: pass, ...rest } = ValidUser._doc;

    res.cookie("access-token", token, { httpOnly: true,secure:true,maxAge:300000 }).status(200).json(rest);
   
    // res.json(token)
  } catch (error) {
    next(error);
  }
};
