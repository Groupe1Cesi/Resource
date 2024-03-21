import { model, models, Schema } from "mongoose";

const RessourceSchema = new Schema({
    titre: String,
    description: String,
    datePublication : String,
    nombreVue: Integer,
    categories: String,
});

const Ressource = models?.Ressource || model("Ressource", RessourceSchema);

export default Ressource;