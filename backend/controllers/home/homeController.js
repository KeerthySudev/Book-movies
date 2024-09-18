const User = require('../../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}
    const otp = generateOtp();

// Controller function to handle user registration

const registerUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email } = req.body;

    if (!name || !email ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user instance
    const newUser = new User({ name, email, phone, dob, aadhaar });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: error.message });
  }
};

const emailVerify = async (req, res) => {

  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'User is not authenticated' });
  // }
  //  console.log(req.user.email);
  const email = 'keerthysudev33@gmail.com';
  
  // Use req.body instead of body.query

  // Example email for demonstration
   // This should ideally be replaced with the email passed in the request

  // Define your OTP (for demonstration purposes, replace with your actual OTP generation logic)
  // const otp = '123456'; // Generate or retrieve the OTP to be sent

  // Create a Nodemailer transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail as the email service
    auth: {
      user: process.env.USER_EMAIL, // Sender's email address
      pass: process.env.USER_PASSWORD, // Sender's email password or app-specific password
    },
  });

  // Define the mail options
  const mailOptions = {
    from: process.env.USER_EMAIL, // Sender's email address
    to: email, // Recipient's email address
    subject: 'Email Verification', // Subject of the email
    html: `Your OTP code is ${otp}.`, // Email content with the OTP
  };


  try {
    // Attempt to send the email
    await transporter.sendMail(mailOptions);
    // If successful, send a response back to the client
    res.status(200).send('Verification email sent successfully');
  } catch (error) {
    // If an error occurs, send an error response with the error message
    console.error('Error sending email:', error.message); // Debugging: Log the error message
    res.status(500).send('Error sending email: ' + error.message);
  }
};

// Function to verify OTP
// Function to verify OTP
async function verifyOtp(req, res) {
  if (req.method === 'POST') {
    const userOtp = req.body.otp;

    // Debugging: Log received OTP
    console.log('Received OTP:', userOtp);

    if (!userOtp) {
      console.error('OTP is missing');
      return res.status(400).send('OTP is required.');
    }

    // Assume 'otp' is globally available or fetched from somewhere
    // const storedOtp = '123456';

    // Debugging: Log stored OTP
    console.log('Stored OTP:', otp);

    // Check if the OTP exists and matches
    if (otp && otp === userOtp) {
      // OTP is valid
      console.log('OTP verification successful');
      return res.status(200).send('OTP verified successfully!');
    } else {
      // OTP is invalid
      console.error('Invalid OTP');
      return res.status(400).send('Invalid OTP.');
    }
  } else {
    console.error(`Method ${req.method} Not Allowed`);
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

  module.exports = {registerUser,emailVerify, verifyOtp};



