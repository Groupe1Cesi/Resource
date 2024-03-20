import {Button, Textarea} from "@nextui-org/react";
import React from "react";
import Link from "next/link";

export default function addRessource(){
    return (
        <div>
            <h1>Ajouter une ressource</h1>
            <Textarea placeholder={"Titre de la ressource"}></Textarea>
            <Textarea placeholder={"Categorie"}></Textarea>
            <Textarea placeholder={"Description"}></Textarea>
            <Button variant="solid" className={"mt-10 mr-20"}><Link href={'/'}>Ajouter</Link></Button>
        </div>
    );
}