import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript API!');
});

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
