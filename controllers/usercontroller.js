// import { Router } from 'express';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user1 = mongoose.model('User');

router.get('/', (req, res) => {
    res.render('Pages/welcome');
})
router.get('/signup',(req,res)=>{
    res.render('Pages/registration');
})

router.get('/login',(req,res)=>{
    res.render('Pages/login');
})

router.get('/manager',(req,res)=>{
    res.render('Pages/manager');
})

router.get('/userprofile/:id', (req, res) => {
    try {
        user1.findById(req.params.id, (eer, doc) => {
            if (!eer) {
                res.render('Pages/profile', {
                    id: doc._id,
                    name: doc.name,
                    email: doc.email,
                    password: doc.password,
                });
            }
            else {
                console.log("Error" + eer);
            }
        })
    }
    catch (error) {
        res.send("error is" + error);
    }
})

router.post('/signup', (req, res) => {
    try {
        const user = new user1({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            login: false
        })
        console.log("posted");
        user.save();
        res.redirect('/login');
    }
    catch (error) {
        console.log(error);
        res.redirect('/signup');
    }
})
router.post('/login', async (req, res) => {
    try {
        let foundmanager = user1.find(() => req.body.email == "manager@gmail.com" && req.body.password == "Manager");
        let foundUser = user1.find((eer, data) => req.body.email === data.email && req.body.password === data.password);
        if (foundmanager) {
            res.redirect('/manager');
        }
        else if (foundUser) {
            const email = req.body.email;
            const found = await user1.findOne({ email: email })
            nam = found._id
            if (req.body.password === found.password) {
                res.redirect('/userprofile/' + nam)
            }
            else {
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='/login'>login again</a></div>");
            }
        }
        else {
            res.send(`<h1>User Not Exist</h1>`);
        }
    } catch (error) {
        res.send("Internal server error" + error);
    }
});

module.exports = router ;