const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || "1p08a92tk0";

exports.register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        if (!username || !password || !email || !role) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });


        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            role,
            token
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        let {username, password} = req.body
        console.log(username, password);

        if (!username || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        let date = new Date()

        const token = jwt.sign({ id: user._id, username: user.username, role: user.role, date }, secretKey, { expiresIn: '1h' });
        console.log(token);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(".")[1];
    console.log(token);
    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }
    
    const decoded = jwt.decode(token, secretKey);
    try {
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
