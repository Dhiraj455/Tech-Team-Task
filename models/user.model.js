const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
})

const itemSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required:true
    },
    itemPrice:{
        type: Number,
        required:true
    },
    itemDescription:{
        type: String,
        required:true
    },
    itemImage:{
        type: String,
        required:true
    }
})

const cartSchema = new mongoose.Schema({
    itemImage:{
        type: String,
        required:true
    },
    itemName:{
        type: String,
        required:true
    },
    itemPrice:{
        type: Number,
        required:true
    },
    userid:{
        type: String,
        required:true
    }
})

const totalSchema = new mongoose.Schema({
    total:{
        type: Number,
        required:true
    }
})

const historySchema = new mongoose.Schema({
    items:{
        type: String,
        required:true
    },
    userid:{
        type: String,
        required:true
    },
    money:{
        type: Number,
        required:true
    },
    date:{
        type: Date,
        required:true
    }
})

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Item', itemSchema);
module.exports = mongoose.model('Cart', cartSchema);
module.exports = mongoose.model('Total', totalSchema);
module.exports = mongoose.model('History', historySchema);