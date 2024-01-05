import mongoose from 'mongoose';

class Connection {
    private readonly URI = 'mongodb://127.0.0.1:27017/Countries';

    static connectDb = async (): Promise<any> => {
        try {
            await mongoose.connect(this.URI);
            console.log('Connection successful');
        } catch (error) {
            console.log(error);
            console.error('Database Connection Failed');
            process.exit(0);
        }
    };

    static disconnectDb = async (): Promise<any> => {
        try {
            await mongoose.disconnect();
            console.log('Disconnect successfully');
        } catch (error) {
            console.log('Error in disconnect', error);
        }
    };
}

export default Connection;
