const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./routers/user.router");
const AuthRouter = require("./routers/auth.router");
const app = express();

const uri = 'mongodb+srv://Davlat305:Real_9118148131@davlat305.5vyyyw4.mongodb.net/?retryWrites=true&w=majority&appName=Davlat305';


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB muofaqqiyatli ulandi');
});
db.on('error', (err) => {
    console.error('MongoDB ga ulanishda xatolik:', err);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", UserRouter);
app.use("", AuthRouter)

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
