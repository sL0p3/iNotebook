const mongoose = require('mongoose');

const connectToMongo = async ()=> {
    try{ 
    const conn = await mongoose.connect("https://mongodb.prashantguptaideamagix.org/api/navigation/render/main", {
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