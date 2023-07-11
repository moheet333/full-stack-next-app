import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongodb Connected Successfully");
        });

        connection.on('error', (err) => {
            console.log("Mongodb connection error, Please make sure mongoDB is running. " + err);
            process.exit();

        });
    } catch (error) {
        console.log("Something went wrong.");
        console.log(error);

    }
}