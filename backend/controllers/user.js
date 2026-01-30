import supabase from "../utils/supabaseClient.js"

export const registerUser = async (req, res) => {
  try {
    //extract user details from the rqst body
    const { email, password, full_name, phone_number } = req.body;

    //validate input
    if (!email || !password || !full_name || !phone_number) {
      return res.status(400).json({ error: 'Email, password, full name, and phone number are required' });
    }

    //call Supabase's signUp method with user metadata
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

    //handle errors from Supabase
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    //respond with success
    return res.status(200).json({
      message: 'User registered successfully',
      user: data.user,
    });
  } catch (err) {
    console.error(err); 
    //handle unexpected errors
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const logInUser = async (req, res) => {
  try {
    //extract user details from the request body
    const { email, password } = req.body;

    //validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    //call Supabase's signInWithPassword method for login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    //handle errors from Supabase
    if (error) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    //respond with success
    return res.status(200).json({
      message: 'User logged in successfully',
      user: data.user,
    });
  } catch (err) {
    console.error(err);
    //andle unexpected errors
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const logOutUser = async (req, res) => {
  try {
    //call Supabase's signOut method to log out the user
    const { error } = await supabase.auth.signOut();

    //handle errors from Supabase
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    //respond with success
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.error(err);
    // Handle unexpected errors
    return res.status(500).json({ error: 'Internal server error' });
  }
};