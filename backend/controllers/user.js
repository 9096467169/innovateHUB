import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'darren$12345';


//signup
async function handleUserSignup(req, res) {
  try {
      const { role = 'student', name, rollNo, email, password, teacherDetails } = req.body;

      const profilePic = req.file ? req.file.path : '/uploads/images/default.png';
     
      // Validate required fields
      if (!name || !email || !password) {
          return res.status(400).json({ message: "Name, email, and password are required." });
      }

      // Prevent admin registration
      if (role === 'admin') {
          return res.status(403).json({ message: "Admins cannot sign up. Please contact the administrator." });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists." });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Prepare user data
      let userData = {
          name,
          email,
          password: hashedPassword,
          role,
          profilePic
      };

      // Student validation
      if (role === 'student') {
          if (!rollNo) {
              return res.status(400).json({ message: "Roll number is required for students." });
          }
          userData.rollNo = rollNo;
      }

      // Faculty validation
     // Faculty validation
     if (role === 'faculty') {
      if (!teacherDetails) {
        return res.status(400).json({ message: "Faculty details are required." });
      }
    
      // Check if teacherDetails is already an object or needs parsing
      let parsedTeacherDetails;
      if (typeof teacherDetails === 'string') {
        try {
          parsedTeacherDetails = JSON.parse(teacherDetails);
        } catch (error) {
          return res.status(400).json({ message: "Invalid faculty details format." });
        }
      } else {
        parsedTeacherDetails = teacherDetails; // Already an object
      }
    
      const { department, licenseNumber, instituteName } = parsedTeacherDetails;
      if (!department || !licenseNumber || !instituteName) {
        return res.status(400).json({ message: "All faculty details are required." });
      }
      userData.teacherDetails = { department, licenseNumber, instituteName };
    }

      // Save user
      const user = new User(userData);
      await user.save();

     //send response
      res.status(201).json({ message: `${role} registered successfully. Please log in.` });

  } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Internal server error." });
  }
};

//login
async function handleUserLogin(req, res) {
  try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required." });
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: "Invalid credentials." });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials." });
      }

      // Generate JWT token
      const token = jwt.sign(
          { userId: user._id, role: user.role, name: user.name },
          JWT_SECRET,
      );

      // Store token in an HTTP-only cookie
      res.cookie("token", token, {
          httpOnly: true,
      });

      res.status(200).json({
          message: "Login successful",
          user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });

  } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal server error." });
  }
}
        

export {handleUserSignup ,handleUserLogin};