import dotenv from 'dotenv';

// configure the env
dotenv.config();


class Env {
    public static readonly DATA_SOURCE_URL = process.env.DATA_SOURCE_URL; // URL of the data source
    public static readonly PORT = process.env.PORT; // PORT to listen on the server
}

export default Env;