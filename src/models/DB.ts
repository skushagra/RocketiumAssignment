import { Sequelize, DataTypes } from "sequelize";

class DB {

    public static instance: DB;
    public sequelize: Sequelize; // using sequelize to connect to the database
    public Data: any; // data model

    constructor() {
        // define a database and connect to it
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'database.sqlite',
            logging: false
        });

        // initialize the data model
        this.Data = null;

        // create the data model
        this.init();    
    }

    // get the instance of the db
    public static getInstance(): DB {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }

    // maintain one instance of db

    // return the data model
    private init(): void {
        this.Data = this.sequelize.define('Data', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            language: {
                type: DataTypes.STRING,
                allowNull: false
            },
            DataId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            bio: {
                type: DataTypes.STRING,
                allowNull: false
            },
            version: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        })
    }

}

export default DB;