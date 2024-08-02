import express from 'express';
import cors from 'cors';
import db from '../models/DB';
import DataSource from '../utils/DataSource';
import DataRoute from '../routes/data.route';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.mountRoutes();
    }

    private async config(): Promise<void> {
        new db().sequelize.sync();
        await DataSource.init();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }


    private mountRoutes(): void {
        this.app.use('/api/v0', new DataRoute().route);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });
    }
}

export default App;