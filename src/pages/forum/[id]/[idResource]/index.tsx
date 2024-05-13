import Image from "next/image";
import { Inter } from "next/font/google";
import Nav from "@/components/client/view/nav";
import Footer from "@/components/client/view/footer";
import Link from "next/link";
import { useRouter } from "next/router";
import {useEffect, useState } from "react";
import { User } from "@/types/user"
import { useCookies } from "react-cookie";
import useSWR from 'swr'
import { useRegion } from "@/components/client/hook/useRegion";
const inter = Inter({ subsets: ["latin"] });
import { Regions, Region } from "@/types/region";
import { Forums, Forum } from "@/types/forum";
import { Resource } from "@/types/resource";
import { useForum } from "@/components/client/hook/useForum";
import { FaRegFolder } from "react-icons/fa";

export default function Home(id: any) {
    let [forum, setForum] = useState<Forum>({nom: '', code: '', description: ''});
    let [forumFetched, setForumFetched] = useState(false)
    let [resource, setResource] = useState<Resource>({
        uniqueId: "",
        forum: "",
        auteur: "",
        titre: "String",
        contenue: "String",
        datePublication : new Date(),
        dateMaj : new Date(),
        dateModification : null ,
        modifier: false,
        nombreVue: 0,
        categories: [],
        invisible: false,
        moderer: false,
        commentaire: [],
    })
    let [resourceFetched, setResourceFetched] = useState(false)
    let router = useRouter()

    let fetchForum = async () => {
        let response: Forum
        try {   
            response = await fetch(`/api/forum/${router.query.id}`).then(res => res.json())
            setForum(response)
            setForumFetched(true)
        } catch (error) {
            console.log(error)
        }
    }

    let fetchResources = async () => {
        let response: Resource
        try {
            response = await fetch(`/api/ressource/${router.query.idResource}`).then(res => res.json())
            setResource(response)
            setResourceFetched(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (router.isReady) {
            // if (!forumFetched) {
            //     fetchForum()
            // }
            if (!resourceFetched) {
                fetchResources()
            }
        }
    })

    return (
        <>
            <Nav />
            <main className="flex-shrink-0">
                <div className="container">
                    <div className="d-flex flex-md-column border rounded m-5 p-4 bg-gray-300">
                <div>
                <div className="flex flex-row">
                    <Image src={"/images/picture/profil-picture.png"} alt="Image de profil" width={50} height={50}
                           className={"mr-5"}/>
                        <div className={"flex-col flex-1"}>
                            <p>Nom</p>
                            <p>Prenom</p>
                        </div>
                        <div className="flex-col flex-3">
                            <h1 className="font-bold">Ressource titre</h1>
                            <p className="font-bold">Categories</p>
                        </div>
                        <div className="flex-col flex-1 text-center">
                            <p>Date : 20/03/2024</p>
                            <p>53 vues</p>
                        </div>
                </div>

                <div className="mt-4">
                    <p className="italic">ressource description , la description de la ressource
                        ressemble a une ressource avec beaucoup deressource mais on seulement la ressource permet de
                        ressourcer
                        plusieur ressource sur une base de ressourciel</p>
                </div>
            </div>

            <div className="text-center mt-5 align-right">
                <button className="border border-r-2 rounded bg-success p-2 text-white"><Link href={'/ressource/addRessource/'}>Ajouter</Link></button>
                <button className="border border-r-2 rounded bg-danger p-2 text-white">Supprimer</button>
            </div>

        </div>
                    -----------
                    <div className="d-flex flex-md-column border rounded m-5 p-4 bg-gray-300">
                        <div className="card text-white bg-secondary mb-3" style={{'maxWidth': '18rem'}}>
                            <div className="card-header">{resource.auteur} {resource.datePublication.toString()}</div>
                            <div className="card-body">
                                {resource.contenue}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}