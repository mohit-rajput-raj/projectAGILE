import jwt from "jsonwebtoken";

const genToken = (USERid, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ USERid }, process.env.JWT_SECRET, {
      expiresIn: "30d",
  });

  res.cookie("jwt", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      sameSite: "none", // Fix cross-origin issues
      secure: process.env.NODE_ENV === "production", // Secure in production
  });

    // return res.json({ message: "Token set successfully" });

  } catch (error) {
    console.error("Error in genToken:", error);
    return res.status(500).json({ msg: error.message });
  }
};

export default genToken;
