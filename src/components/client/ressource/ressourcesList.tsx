import Link from "next/link";
import React from "react";

export default function RessourcesList(){
    return (
        <div className="d-flex flex-md-column border rounded m-5 p-4 bg-blue-600">
            <div className="bg-blue">
                <h2>Ressource title</h2>
                <p className="font-bold">Categorie Ressource</p>
                <div>
                    <p>ressource description , la description de la ressource ...</p>
                </div>
            </div>

            <div className="m-2 mb-5">
                <button><Link href={'/ressource/addRessource/'}>Ajouter</Link></button>
                <button>Supprimer</button>
            </div>

        </div>
    );
}