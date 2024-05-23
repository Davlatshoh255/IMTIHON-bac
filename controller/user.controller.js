const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        if (!username || !password || !email || !role) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            role
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.remove();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
