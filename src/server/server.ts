import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, this is Express + TypeScript');
});

app.get('/transactions', (req: Request, res: Response) => {
    res.send('GET /transactions');
});

app.listen(port, () => {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});