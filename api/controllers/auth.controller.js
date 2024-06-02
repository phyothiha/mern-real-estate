const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user and save in database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const tokenExpiredIn = 1000 * 60 * 60;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiredIn }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: tokenExpiredIn,
        // secure: true,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

module.exports = {
  register,
  login,
  logout,
};
