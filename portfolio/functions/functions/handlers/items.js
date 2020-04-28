const { db } = require("../util/admin");

exports.getAllItems = (req, res) => {
  db.collection("items1")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let items = [];
      data.forEach((doc) => {
        items.push({
          itemId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(items);
    })
    .catch((err) => console.error(err));
};

exports.postOneItem = (req, res) => {
  if (req.body.description.trim() === "") {
    return res
      .status(400)  
      .json({ description: "Description must not be empty" });
  }
  if (req.body.title.trim() === "") {
    return res.status(400).json({ title: "Title must not be empty" });
  }

  const newItem = {
    date: req.body.date,
    day: req.body.day,
    description: req.body.description,
    executed: req.body.executed,
    hour: req.body.hour,
    idTask: req.body.idTask,
    invitation: req.body.invitation,
    location: req.body.location,
    month: req.body.month,
    monthYear: req.body.monthYear,
    title: req.body.title,
    year: req.body.year,
    username: req.user.username,
    createdAt: new Date().toISOString(),
  };
  db.collection("items1")
    .add(newItem)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

// Fetch one item
exports.getItem = (req, res) => {
  let itemData = {};
  db.doc(`/items1/${req.params.itemId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Item not found' });
      }
      itemData = doc.data();
      itemData.itemId = doc.id;
      return db
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .where('screamId', '==', req.params.screamId)
        .get();
    })
    .then((data) => {
      screamData.comments = [];
      data.forEach((doc) => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
