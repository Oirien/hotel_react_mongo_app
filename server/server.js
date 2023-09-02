const express = require("express");
const app = express();
const cors = require("cors");
const createRouter = require("./helpers/create_router");
const MongoClient = require("mongodb").MongoClient;

app.use(express.json());
app.use(cors());

MongoClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology: true })
    .then(client => {
        const db = client.db("hotel_db");
        const bookings = db.collection("bookings");
        const bookingsRouter = createRouter(bookings);
        app.use("/api/bookings", bookingsRouter);
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
    });

app.listen(9000, function () {
    console.log(`Listening on port ${this.address().port}`);
});
