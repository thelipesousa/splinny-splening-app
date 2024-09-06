import mongoose, { Schema, Document } from 'mongoose';

interface IRecipe extends Document {
  name: string;
  ingredients: string[];
  instructions: string;
}

const recipeSchema: Schema = new Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
});

export default mongoose.model<IRecipe>('Recipe', recipeSchema);
