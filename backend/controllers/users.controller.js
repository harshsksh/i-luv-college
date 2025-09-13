import prisma from "../prisma/prisma-client.js";
import bcrypt from "bcryptjs";
import generateTokenandSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All the fields are required." });
  }

  try {
    const user = await prisma.user.findFirst({ where: { username } });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const profilePicLink = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        profilePicLink,
      },
    });

    // Create user data without password
    const userData = {
      username: newUser.username,
      profilePicLink: newUser.profilePicLink,
      id: newUser.id,
    };

    await generateTokenandSetCookie(userData, res);

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error in signup controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Create user data without password
    const userData = {
      username: user.username,
      profilePicLink: user.profilePicLink,
      id: user.id,
    };

    await generateTokenandSetCookie(userData, res);

    return res.json(userData);
  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
        username: true,
        profilePicLink: true,
        College: true,
        likedColleges: true,
      },
    });
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in allUsers controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
