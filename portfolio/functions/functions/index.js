const functions = require("firebase-functions");

// const express = require("express");
// const app = express();
const app = require("express")();

const FBAuth = require("./util/fbAuth");

const { getAllItems, postOneItem, getItem } = require("./handlers/items");
const { signup, login, uploadImage, getAuthenticatedUser } = require("./handlers/users");

//Item routes
app.get("/items", getAllItems);
app.post("/item", FBAuth, postOneItem);
app.get("/item/:itemId",getItem);
//TODO delete item


//users routes
app.post("/signup", signup); //works
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
//exports.api = functions.region("europe-west1").https.onRequest(app);
