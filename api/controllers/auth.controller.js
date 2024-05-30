const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");

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

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = (req, res) => {
  console.log("login");
};

const logout = (req, res) => {
  console.log("logout");
};

module.exports = {
  register,
  login,
  logout,
};
