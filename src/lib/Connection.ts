import mongoose from 'mongoose';

class Connection {
    private readonly URI = 'mongodb://127.0.0.1:27017/Countries';

    connectDb = async (): Promise<any> => {
        try {
            await mongoose.connect(this.URI);
            console.log('Connection successful');
        } catch (error) {
            console.error('Database Connection Failed');
        }
    };

    disconnectDb = async (): Promise<any> => {
        try {
            await mongoose.disconnect();
            console.log('Disconnected successfully');
        } catch (error) {
            console.log('Error in disconnect', error);
        }
    };
}

export default new Connection();
