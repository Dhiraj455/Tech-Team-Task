const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect( process.env.DATABASE, {
    useNewUrlParser: true,
},
    err => {
        if (!err) {
            console.log("Database Connected");
        }
        else {
            console.log("Error Is There" + err);
        }
    })
    require('./user.model');