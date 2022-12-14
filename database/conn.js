import mongoose from 'mongoose';

const connectMongo = async () => {
    try{

        const { connection }  = await mongoose.connect(procss.env.MONGO_URI)

        if(connection.readyState == 1){
            console.log("Database Connected")
        }

    }catch(errors){
        return Promise.reject(errors)
    }
}

export default connectMongo;