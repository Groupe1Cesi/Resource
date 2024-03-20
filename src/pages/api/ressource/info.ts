import { initiMongoose } from "../../../lib/mongoose";
import Ressource from "../../../models/ressource";

export default async function handle(req, res) {
    await initiMongoose();
    res.json(await Ressource.find().exec());
}