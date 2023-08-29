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

        app.post('/transactions', async (req: Request, res: Response) => {
            const totalPrice = req.body.totalPrice;
            const selectedFruits = req.body.selectedFruits;

            // simple validation
            if (!totalPrice || !selectedFruits) {
                res.status(400).send('Missing parameters');
            }

            const items = selectedFruits.map((x: { name: string, quantity: number, price: number }) => { return { fruit: x.name, quantity: x.quantity, price: x.price } });

            const transaction = new Transaction();
            transaction.items = items;
            transaction.totalPrice = totalPrice;
            manager.save(transaction);
            res.status(200).send();
        });

        app.listen(port, () => {
            console.log(`[Server]: I am running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
