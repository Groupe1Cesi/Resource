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
import { parseISO, format } from 'date-fns';

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
                <div className="d-flex flex-md-column m-5 p-4 bg-gray-300">
                    <div className="card text-white bg-secondary mb-3">
                        <div className="card-header">
                            <p>{resource.auteur} le {resource.datePublication.toString()}</p></div>
                        <div className="card-body">
                            {resource.contenue}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}