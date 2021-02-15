const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = "mongodb://localhost:27017/db";
        const options = {
            useNewUrlParser : true,
            useCreateIndex : true,
            useFindAndModify : false,
            useUnifiedTopology : true
        }
        await mongoose.connect(mongoURI,options);
        console.log('mongodb on...');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;