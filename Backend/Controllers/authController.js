import bcrypt from "bcrypt";
import UserDB from "../Models/UserModels.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { userName, phoneNumber, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserDB.findOne({
      $or: [{ userName }, { phoneNumber }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new UserDB({
      userName,
      phoneNumber,
      email,
      password: hashedPassword,
      picture: req.file ? req.file.filename : null, // Save the filename of the uploaded picture
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ newUser });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await UserDB.findOne({
      $or: [{ email: userName }, { userName: userName }],
    });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials user!" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid credentials password!" });
    }

    // Generate JWT token
    const tokenExpiry = "7d"; // 7 days in JWT format
    const jwtSecret = process.env.JWT_TOKEN; // Ensure your environment variable is correct
    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: tokenExpiry,
    });

    const cookieExpiry = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: cookieExpiry,
        // secure: true, // Uncomment this line if using HTTPS
      })
      .json({ message: "Login successful." });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred during login. Please try again." });
  }
};
