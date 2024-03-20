import {Button, Textarea} from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import Nav from "@/components/client/nav";
import Ressource from "@/components/client/ressource";
import Footer from "@/components/client/footer";

export default function addRessource(){
    return (

        <div className="d-flex flex-column h-100">
            <Nav/>
            <main className="flex-shrink-0">
                <div className={"d-flex flex-md-column w-auto"}>
                    <h1>Ajouter une ressource</h1>
                    <Textarea placeholder={"Titre de la ressource"}></Textarea>
                    <Textarea placeholder={"Categorie"}></Textarea>
                    <Textarea placeholder={"Description"}></Textarea>
                    <Button variant="solid" className={"mt-10 mr-20"}><Link href={'/'}>Ajouter</Link></Button>
                </div>
            </main>
            <Footer/>
        </div>
    );
}