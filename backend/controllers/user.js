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