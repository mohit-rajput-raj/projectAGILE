import jwt from "jsonwebtoken";

const genToken = (userId, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/"
    });

  } catch (error) {
    console.error("Error in genToken:", error);
    return res.status(500).json({ msg: error.message });
  }
};

export default genToken;
