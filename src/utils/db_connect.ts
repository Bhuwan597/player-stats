import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

if (!URI) {
    throw new Error("Please define MongoDB URL");
}

const connect = async () => {
    for (let i = 0; i < 5; i++) {
        try {
            await mongoose.connect(URI);
            console.log('Connected to MongoDB');
            break; // Break out of the loop once connected successfully
        } catch (error: any) {
            console.error('Failed to connect to MongoDB:', error.message);
            if (i < 4) { // Retry only 4 times, since the loop starts from 0
                console.log(`Retrying connection attempt ${i + 1}...`);
                // Wait for a short duration before retrying
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                throw new Error('Failed to connect to MongoDB after multiple attempts');
            }
        }
    }
};

export default connect;

