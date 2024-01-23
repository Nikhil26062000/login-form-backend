const mongoose = require('mongoose');

const Connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/formDatabase");
        console.log("Connection established");
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

Connection();
