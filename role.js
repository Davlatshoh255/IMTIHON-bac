const User = require("./models/user.model");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// .env faylini o'qish
dotenv.config();

let SECRET_KEY = process.env.SECRET_KEY;

// SECRET_KEY qiymatini konsolda ko'rsatish
console.log(process.env.SECRET_KEY);

// Token yaratish misoli
const token = jwt.sign({ userId: '12345' }, SECRET_KEY, { expiresIn: '1h' });
console.log(token);