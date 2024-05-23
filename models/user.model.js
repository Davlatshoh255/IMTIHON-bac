const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt'); 

const readBookSchema = new Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    issue_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    return_date: {
        type: Date,
        required: true
    }
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] 
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    readBooks: [readBookSchema]
}, { timestamps: true }); // timestamps qo'shish

// Parolni saqlashdan oldin hash qilish
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        return next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
