const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/User", {
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