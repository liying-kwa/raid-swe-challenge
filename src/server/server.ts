import "reflect-metadata"
import { DataSource } from "typeorm"
import { Fruit } from "./entity/Fruit"
import express, { Express, Request, Response } from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import { Transaction, TransactionItem } from "./entity/Transaction";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: process.env.DB_NAME,
    url: process.env.DB_URL,
    synchronize: true,
    logging: ['query', 'error'],
    entities: [Fruit, Transaction],
    migrations: [],
    subscribers: [],
})

const app: Express = express();
const port = 8080;

AppDataSource.initialize()
    .then(() => {
        // AppDataSource
        console.log("Data Source has been initialized!")
        const manager = AppDataSource.manager;

        // CORS
        const allowedOrigins = ['http://localhost:3000'];
        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };
        app.use(cors(options));
        app.use(express.json());

        // APIs
        app.get('/', (req: Request, res: Response) => {
            res.send('Hello, this is Express + TypeScript');
        });

        app.get('/fruits', (req: Request, res: Response) => {
            manager.find(Fruit)
                .then((fruits) => res.send(fruits))
                .catch((err) => console.error("Error fetching fruits: ", err))
        });

        app.get('/transactions', async (req: Request, res: Response) => {
            // TODO
            const transaction = new Transaction();
            const item1 = new TransactionItem();
            item1.fruit = 'Orange';
            item1.quantity = 2;
            item1.price = 3.60;
            const item2 = new TransactionItem();
            item2.fruit = 'Apple';
            item2.quantity = 3;
            item2.price = 6;
            transaction.items = [item1, item2];
            transaction.totalPrice = 3.60;
            manager.save(transaction);
            res.send('GET /transactions')
        });

        app.listen(port, () => {
            console.log(`[Server]: I am running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
