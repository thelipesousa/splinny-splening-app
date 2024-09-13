import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipeRoutes';

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

  app.get('/', (req, res) => {
    res.status(200).send('API está funcionando!');
  });
  

// Usando as rotas
app.use('/', recipeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔥Servidor rodando na porta ${PORT}`);
});
