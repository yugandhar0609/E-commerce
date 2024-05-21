import bcrypt from "bcrypt";
import UserDB from "../Models/UserModels.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = await UserDB.create({
      data: { userName, email, password: hashedPassword },
    });

    res.status(201).json({ newUser });
  } catch (error) {
    console.log("error:", error.message);
    res.status(501).json({ message: "Registion failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // userName Check
    const user = await UserDB.findUnique({ where: { userName } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Password check
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
const age = 1000 * 60 * 60 * 24 * 7
    res.cookie("test2","myValue2",{
      httpOnly:true,
      maxAge:age,
      // secure:true,
    })
    .json({ message: "Login successful." });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred during login. Please try again." });
  }
};
