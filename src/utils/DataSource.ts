import axios from "axios";
import Env from "../env";
import DB from "../models/DB";

class DataSource {

    static async init() {

        // get data source url
        const dataSourceUrl = Env.DATA_SOURCE_URL;
        if (!dataSourceUrl) {
            throw new Error('Data source url not found');
        }

        // fetch data from third party api
        const data  = await axios.get(dataSourceUrl);

        // save data to database
        const db = DB.getInstance();
        
        // delete all data in DB
        await db.Data.destroy({
            where: {},
            truncate: true
        });

        // add latest data to DB
        for (const item of data.data) {
            await db.Data.create({
                name: item.name,
                language: item.language,
                bio: item.bio,
                version: item.version,
                DataId: item.id
            });
        }
    }

}

export default DataSource;