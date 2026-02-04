import supabase from "../utils/supabaseClient.js";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    // Extract user details from the request body
    const { email, password, full_name, phone_number } = req.body;

    // Validate input
    if (!email || !password || !full_name || !phone_number) {
      return res.status(400).json({
        error: "Email, password, full name, and phone number are required",
      });
    }

    // Call Supabase's signUp method with user metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          phone_number,
        },
      },
    });

    // Handle errors from Supabase
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Respond with success
    return res.status(200).json({
      message: "User registered successfully",
      user: data.user,
    });
  } catch (err) {
    console.error(err);
    // Handle unexpected errors
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logInUser = async (req, res) => {
  try {
    // Extract user details from the request body
    const { email, password } = req.body;

    console.log("Login attempt:", { email, password });

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // Handle errors from Supabase
    if (error) {
      console.error("Supabase login error:", error.message);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = data.user;

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    console.log(token);

    // Respond with success
    return res.status(200).json({
      message: "User logged in successfully",
      user: data.user,
      token,
    });
  } catch (err) {
    console.error(err);
    // Handle unexpected errors
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logOutUser = async (req, res) => {
  try {
    //extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    //verify the token
    try {
      jwt.verify(token, SECRET);
    } catch {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    //call Supabase's signOut method to log out the user
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    //respond with success
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
