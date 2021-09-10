const express = require("express");
const mongoose = require("mongoose");

const FoodModel = require("./models/Food");

const app = express();



app.use(express.json());

mongoose.connect("", {
    useNewUrlParser: true,
});

app.get("/", async (req, res) => {
    const food = new FoodModel({ foodName: "Banana", daysSinceIAte: 5 });

    try {
        await food.save();
        res.send("insterted data");
    } catch(err) {
        console.log(err);
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001...");
});