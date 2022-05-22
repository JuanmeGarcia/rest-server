const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database is connected');
    }catch(e){
        throw new Error(e)
        console.log(e)
    }
}


module.exports = {
    dbConnection
}