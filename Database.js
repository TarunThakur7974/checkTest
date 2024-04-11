const mongoose = require('mongoose');


const ConnectToMongo = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGOURI);
          console.log("connect")
      } catch (error) {
          console.log(error)
      }
}

module.exports = ConnectToMongo 