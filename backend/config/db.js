const mongoose = require("mongoose");
const colors = require("colors");

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB Connected: ${conn.connection.host}`.cyan.underline);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
