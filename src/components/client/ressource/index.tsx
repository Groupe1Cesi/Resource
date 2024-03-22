import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import {useEffect, useState } from "react";

// type ressource 

type Ressource = {
    titre: string,
    description: string,
}

export async function getServerSideProps() {
    try {
        let response = await fetch('http://localhost:3000/api/ressource/info');
        let posts = await response.json();

        return {
            props: { posts: JSON.parse(JSON.stringify(posts)) },
        };
    } catch (e) {
        console.error(e);
    }
}

export default function Ressource(){
    const router = useRouter()
    const [ressource, setRessource] = useState(null as Ressource | null);
    const [ressourceinfosCalled, setRessourceinfosCalled] = useState(false)
    let [_, setCookie] = useCookies(['token'])
    let logout = () => {
        setCookie('token', '', { path: '' })
        setTimeout(() => {
            router.push('/auth/connexion')
        }, 1000);
    }
    let GetRessource = async () => {
        let res = await fetch(`/api/ressource/info`, { method: "GET", headers: { "Authorization": _.token } }).then(res => res.json())
        return res;
    }

    let ressourceinfos = async () => {
        if (_.token !== undefined && _.token !== null && _.token !== "") {
            if (!ressourceinfosCalled) {
                setRessourceinfosCalled(true)
                let res = await GetRessource()
                if (res.status === "success") {
                    setRessource(res.ressource)
                }
                if (res.status === "failed") {
                    setTimeout(() => {
                        setRessourceinfosCalled(false)
                        router.push('/auth/connexion')
                    },1000)
                }
                if (res.status === "error") {
                    setCookie('token', null, { path: '/' })
                    await router.push('/auth/connexion')
                }
            }
        }
    }
    useEffect(() => {
        ressourceinfos()
    })

    return (
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
    );
}