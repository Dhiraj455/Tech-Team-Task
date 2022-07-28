const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user1 = mongoose.model("User");
const item = mongoose.model("Item");
const cart = mongoose.model("Cart");
const total = mongoose.model("Total");
const history = mongoose.model("History");
var session = require('express-session');


uid = "";
temid = "";
router.get("/", (req, res) => {
  session=req.session;
  console.log(req.session.user)
  if (uid != "") {
    res.redirect("/main");
  } else {
    res.render("Pages/welcome",{
      user:req.session.user
    });
    uid = "";
  }
});
router.get("/signup", (req, res) => {
  if (uid != "") {
    res.redirect("/main");
  } else {
    res.render("Pages/registration",{
      user:req.session.user
    });
    uid = "";
  }
});

router.get("/login", (req, res) => {
  res.render("Pages/login",{
    user:req.session.user
  });
  uid = "";
});

router.get("/manager", (req, res) => {
  console.log(req.session.user);
  try {
    item.find({}, function (err, doc) {
      console.log(doc);
      temid = temid + doc._id;
      if (!err) {
        res.render("Pages/manager", {
          items: doc,
          user:req.session.user
        });
      } else {
        console.log("Error" + eer);
      }
    });
  } catch (error) {
    res.send("error is" + error);
  }
});

router.get("/userprofile/:id", (req, res) => {
  try {
    user1.findById(req.params.id, (eer, doc) => {
      if (!eer) {
        res.render("Pages/userprofile", {
          id: doc._id,
          name: doc.name,
          email: doc.email,
          password: doc.password,
          user:req.session.user
        });
      } else {
        console.log("Error" + eer);
      }
    });
  } catch (error) {
    res.send("error is" + error);
  }
  console.log(uid);
});

router.get("/edit/:id", (req, res) => {
  try {
    item.findById(req.params.id, (eer, doc) => {
      console.log(doc);
      if (!eer) {
        res.render("Pages/edit", {
          id: doc._id,
          name: doc.itemName,
          price: doc.itemPrice,
          description: doc.itemDescription,
          image: doc.itemImage,
          user:req.session.user
        });
      } else {
        console.log("Error" + eer);
      }
    });
  } catch (error) {
    res.send("error is" + error);
  }
});

router.post("/profile", (req, res) => {
  try {
    user1.findOne({ _id: uid }, (eer, doc) => {
      if (!eer) {
        res.redirect("/userprofile/" + uid);
      } else {
        console.log("Error" + eer);
      }
    });
  } catch (error) {
    res.send("error is" + error);
  }
});

router.post("/edit/:id", (req, res) => {
  var id = req.params.id;
  try {
    item.findOneAndUpdate(
      { _id: id },
      {
        itemName: req.body.name,
        itemPrice: req.body.price,
        itemDescription: req.body.desc,
        itemImage: req.body.image,
      },
      { new: true },
      (eer) => {
        if (!eer) {
          res.redirect("/manager");
        } else {
          console.log("Error" + eer);
        }
      }
    );
  } catch (error) {
    res.send("error is" + error);
    console.log(error);
  }
});

router.post("/delete/:id", (req, res) => {
  var id = req.params.id;
  try {
    item.findOneAndDelete({ _id: id }, (eer) => {
      if (!eer) {
        res.redirect("/manager");
      } else {
        console.log("Error" + eer);
      }
    });
  } catch (error) {
    res.send("error is" + error);
    console.log(error);
  }
});

router.post("/delete1/:id", (req, res) => {
  var id = req.params.id;
  try {
    cart.findOneAndDelete({ _id: id }, (eer) => {
      if (!eer) {
        console.log("deleted");
        res.redirect("/cart");
      } else {
        console.log("Error" + eer);
      }
    });
  } catch (error) {
    res.send("error is" + error);
    console.log(error);
  }
});

router.post("/addcart", (req, res) => {
  const cart1 = new cart({
    itemImage: req.body.image,
    itemName: req.body.name,
    itemPrice: req.body.price,
    userid: uid,
    count:req.body.count,
  });
  cart1.save((err, doc) => {
    if (!err) {
      console.log("Done");
      res.redirect("/main");
    } else {
      console.log("Error" + err);
    }
  });
});

router.get("/cart", (req, res) => {
  try {
    let moneytotal = 0;
    cart.find({ userid: uid }, (err, doc) => {
      const len = doc.length;
      for (var i = 0; i < len; i++) {
        moneytotal += parseInt(doc[i].itemPrice*doc[i].count);
      }
      console.log(moneytotal);
      if (!err) {
        res.render("Pages/cart", {
          items: doc,
          money: moneytotal,
          user:req.session.user
        });
      } else {
        console.log("Error" + err);
      }
    });
    // }});
  } catch (error) {
    res.send("error is" + error);
  }
});

router.get("/main", (req, res) => {
  console.log(req.session.user);
  try {
    item.find({}, function (err, doc) {
      if (!err) {
        res.render("Pages/main", {
          items: doc,
          user:req.session.user
        });
      } else {
        console.log("Error" + eer);
      }
    });
  } catch (error) {
    res.send("error is" + error);
  }
});

router.get("/additem", (req, res) => {
  res.render("Pages/additem",{
    user:req.session.user
  });
});

router.post("/additem", (req, res) => {
  const newItem = new item({
    itemName: req.body.name,
    itemPrice: req.body.price,
    itemDescription: req.body.desc,
    itemImage: req.body.image,
  });
  newItem.save((err, doc) => {
    if (!err) {
      res.redirect("/additem");
    } else {
      console.log("Error" + err);
    }
  });
});

router.post("/signup", (req, res) => {
  try {
    uid = uid + req.body.id;
    const user = new user1({
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      login: false,
    });
    console.log("posted");
    user.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/signup");
  }
});

router.post("/login", async (req, res) => {
  try {
    // let foundmanager = user1.find(() => req.body.email === "manager@gmail.com" && req.body.password === "Manager");
    let foundUser = user1.find(
      (eer, data) =>
        req.body.email === data.email && req.body.password === data.password
    );
    if (foundUser) {
      if (
        req.body.email === "manager@gmail.com" &&
        req.body.password === "Manager"
      ) {
        const email = req.body.email;
        const found = await user1.findOne({ email: email });
        uid = uid + found._id;
        req.session.user = found;
        res.redirect("/manager");
      } else {
        const email = req.body.email;
        const found = await user1.findOne({ email: email });
        uid = uid + found._id;
        req.session.user = found;
        if (req.body.password === found.password) {
          res.redirect("/main");
        } else {
          res.send(
            "<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='/login'>login again</a></div>"
          );
        }
      }
    } else {
      res.send(`<h1>User Not Exist</h1>`);
    }
  } catch (error) {
    res.send("Internal server error" + error);
  }
  console.log(uid);
});

router.post("/signout", (req, res) => {
  session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  }
  );
  req.session.destroy();
  res.redirect("/login");
});

router.post("/pay", (req, res) => {
  var it = "";
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  try {
    cart.find({ userid: uid }, (err, item) => {
      const len = item.length;
      for (var i = 0; i < len; i++) {
        if(i==len-1){
          it = it + item[i].itemName;
        }
        else{
          it = it + item[i].itemName + ",";
        }
      }
      console.log(it);
      for (var i = 0; i < len; i++) {
        cart.deleteOne({ _id: item[i]._id }, (err, doc) => {
          if (!err) {
            console.log("Done");
          } else {
            console.log("Error" + err);
          }
        });
      }
      const newOrder = new history({
        userid: uid,
        items: it,
        money: req.body.money,
        date: date,
      });
      newOrder.save((err, doc) => {
        if (!err) {
          res.redirect("/cart");
        } else {
          console.log("Error" + err);
        }
      });
    });
  } catch (error) {
    res.send("error is" + error);
  }
});

router.get("/history", (req, res) => {
  console.log("user : ",req.session.user);
  try {
    history.find({ userid: uid }, function (err, doc) {
      const len = doc.length;
      if (!err) {
        res.render("Pages/history", {
          items: doc,
          user:req.session.user
        });
      } else {
        console.log("Error" + eer);
      }
    });
  } catch (error) {
    res.send("error is" + error);
  }
});

module.exports = router;
