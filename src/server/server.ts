import "reflect-metadata"
import { DataSource } from "typeorm"
import { Fruit } from "./entity/Fruit"
import express, { Express, Request, Response } from 'express';
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: process.env.DB_NAME,
    url: process.env.DB_URL,
    synchronize: true,
    logging: ['query', 'error'],
    entities: [Fruit],
    migrations: [],
    subscribers: [],
})

const app: Express = express();
const port = 8080;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")

        app.get('/', (req: Request, res: Response) => {
            res.send('Hello, this is Express + TypeScript');
        });

        app.get('/fruits', (req: Request, res: Response) => {
            AppDataSource.manager.find(Fruit)
                .then((fruits) => res.send(fruits))
                .catch((err) => console.error("Error fetching fruits: ", err))
        });

        app.get('/transactions', async (req: Request, res: Response) => {
            // TODO
            res.send('GET /transactions')
        });

        app.listen(port, () => {
            console.log(`[Server]: I am running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
