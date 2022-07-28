const db = require('./models/db');
const express = require('express');
const handlebars = require('handlebars');
const expresshandlebars = require('express-handlebars');
const path = require('path');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');
const user = require('./controllers/usercontroller');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
dotenv.config();

const app = express();

var session = require('express-session');

app.use(cookieParser());
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 600000000 },
    resave: false
}));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
// app.use(express.static(path.resolve(__dirname + '/public')));
const path1 = require('path')
const publicDirectoryPath = path1.join(__dirname, '/public')
app.use(express.static(publicDirectoryPath))
app.use('/js', express.static(__dirname + './../public/js'));
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', expresshandlebars.engine({
    // helpers: require("./controllers/helper").helpers,
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: __dirname + '/views/Layout/'
}));

app.set('view engine', 'hbs');
app.use('/',user);
app.listen(process.env.PORT || 5000, () => {
    console.log("server started");
})

console.log(process.env.DATABASE)