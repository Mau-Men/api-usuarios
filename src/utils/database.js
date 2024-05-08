import mongoose from "mongoose";

const URI = ''

const databaseConnection = async () => {
    if (!global.mongoose) {
        mongoose.set("strictQuery", false)
        global.mongoose = await mongoose.connect(URI)
            .then(() => console.log('connected to mongodb'))
            .catch(e => console.log(e));
    }
}

export default databaseConnection