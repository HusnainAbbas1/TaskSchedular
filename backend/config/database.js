const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://husnain:RiI62QjKblVyeKJY@cluster0.1s2p5.mongodb.net/Medical_FYP?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log(`Mongodb connected with server `);
    })
    .catch((err) => {
      console.log("Mongodb connection error", err);
    });
};

module.exports = connectDatabase;
