const mongoose = require('mongoose');

const connectToMongo = async ()=> {
    try{ 
    const conn = await mongoose.connect("mongodb://localhost:27017/inotebook", {
        useNewUrlParser:true,
        useUnifiedTopology:true,  
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`)

     }catch(error){
         console.error(`Error: ${error.message}`);
         process.exit();

     }
}

module.exports= connectToMongo;