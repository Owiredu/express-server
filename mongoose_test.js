const mongoose = require("mongoose");

let main = async () => {
    // connect to the database called 'test'
    await mongoose.connect("mongodb://localhost:27017/mongoosetest");

    // make a user schema
    const userSchema = new mongoose.Schema({
        name: String,
        age: Number,
        dob: Date,
        maritalStatus: String
    });

    userSchema.methods.details = function () {
        console.log(`Name: ${this.name}\nAge: ${this.age}\nDate of Birth: ${this.dob.toString()}\nMarital Status: ${this.maritalStatus}`);
    };

    userSchema.methods.speak = function () {
        console.log(`${this.name} is speaking ...`);
    };

    userSchema.methods.walk = function () {
        console.log(`${this.name} is walking ...`);
    };

    // make a user model
    const User = mongoose.model("User", userSchema);

    // create a user instance or document
    const nana = new User({
        name: "Owiredu Nana Kofi",
        age: 24,
        dob: new Date(1996, 11, 15),
        maritalStatus: "Single"
    });
    
    // save the document
    await nana.save();
};

// call the main function and log any error encountered
main().then(console.log).catch(console.log);