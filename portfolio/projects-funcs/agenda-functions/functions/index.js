const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require("./util/fbAuth");

const { getAllItems, postOneItem, editItem, deleteItem } = require("./handlers/items");
const { signup, login, uploadImage } = require("./handlers/users");

//Item routes
app.get("/items", FBAuth, getAllItems);
app.post("/item", FBAuth, postOneItem);
app.post("/user/image", FBAuth, uploadImage);
app.post("/item/edit", FBAuth, editItem);
app.post("/item/delete", FBAuth, deleteItem);

//users routes
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.region("europe-west3").https.onRequest(app);
