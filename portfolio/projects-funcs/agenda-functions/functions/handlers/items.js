const { db } = require("../util/admin");

const { reduceItemDetails } = require("../util/validators");

//gets all items of the user that is logged in
exports.getAllItems = (req, res) => {
  db.collection("items")
    .where("username", "==", req.user.username)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let items = [];
      data.forEach((doc) => {
        items.push({
          itemId: doc.id,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          date: doc.data().date,
          hour: doc.data().hour,
          title: doc.data().title,
          userId: doc.data().userId,
          username: doc.data().username,
        });
      });
      return res.json(items);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.postOneItem = (req, res) => {
  const createdAt = new Date().toISOString();
  const newItem = {
    body: req.body.body,
    date: req.body.date,
    title: req.body.title,
    hour: req.body.hour,
    username: req.user.username,
    userId: req.user.uid,
    createdAt,
  };
  db.collection("items")
    .doc(createdAt)
    .set(newItem)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

exports.editItem = (req, res) => {
  let itemDetails = reduceItemDetails(req.body);

  db.collection("items")
    .doc(req.body.createdAt)
    .set(itemDetails, { merge: true })
    .then(() => {
      return res.json({ message: "Item updated successfully" });
    })
    .catch((err) => {
      console.error(err);
      console.log("createdAt", createdAt);
      res.status(500).json({ error: err.code });
    });
};

exports.deleteItem = (req, res) => {
  db.collection("items")
    .doc(req.body.createdAt)
    .delete()
    .then(() => {
      return res.json({ message: "The item was deleted" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
