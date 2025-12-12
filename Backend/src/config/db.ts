import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const err = error as Error;
    console.error(`\n❌ MongoDB Connection Error: ${err.message}`);
    console.error('ℹ️  Make sure MongoDB is installed, running, and accessible at the URI in your .env file.');
    console.error('   Example: MONGO_URI=mongodb://localhost:27017/roleauthdb');
    process.exit(1);
  }
};

export default connectDB;
