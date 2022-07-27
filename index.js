const db = require('./models/db');
const express = require('express');
const handlebars = require('handlebars');
const expresshandlebars = require('express-handlebars');
const path = require('path');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');
const user = require('./controllers/usercontroller');

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
// app.use(express.static(path.resolve(__dirname + '/public')));
const path1 = require('path')
const publicDirectoryPath = path1.join(__dirname, '/public')
app.use(express.static(publicDirectoryPath))
app.use('/js', express.static(__dirname + './../public/js'));
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', expresshandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: __dirname + '/views/Layout/'
}));

app.set('view engine', 'hbs');
app.use('/',user);
app.listen('3000', () => {
    console.log("server started");
})
