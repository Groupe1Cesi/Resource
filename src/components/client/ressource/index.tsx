import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import {useEffect, useState } from "react";

// type ressource 

type Ressource = {
    titre: string,
    description: string,
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
        <div className="d-flex border rounded m-5 p-4 bg-gray-300">
            <div>
                <h2 className="font-bold">Ressource title</h2>
                <p className="font-bold">Categorie Ressource</p>
                <div>
                    <p>ressource description , la description de la ressource ...</p>
                </div>
            </div>

            <div>
                <button><Link href={'/ressource/addRessource/'}>Ajouter</Link></button>
                <button>Supprimer</button>
            </div>

        </div>
    );
}