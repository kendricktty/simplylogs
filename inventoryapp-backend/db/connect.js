import mongoose from "mongoose";

const connectDB = (url) => {mongoose
    .connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export default connectDB