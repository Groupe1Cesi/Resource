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
import { Resources, Resource } from "@/types/resource";
import { useForum } from "@/components/client/hook/useForum";
import { FaRegFolder } from "react-icons/fa";
import { IoMdWarning, IoMdTrash } from "react-icons/io";

export default function Home(id: any) {
    let [forum, setForum] = useState<Forum>({nom: '', code: '', description: ''});
    let [forumFetched, setForumFetched] = useState(false)
    let [resources, setResources] = useState<Resources>([])
    let [resourcesFetched, setResourcesFetched] = useState(false)
    let router = useRouter()

    let fetchForum = async () => {
        let response: Forum
        try {
            console.log(id)
            response = await fetch(`/api/forum/${router.query.id}`).then(res => res.json())
            setForum(response)
            setForumFetched(true)
        } catch (error) {
            console.log(error)
        }
    }

    let fetchResources = async () => {
        let response: Resources
        try {
            response = await fetch(`/api/forum/${router.query.id}/resources`).then(res => res.json())
            setResources(response)
            setResourcesFetched(true)
            console.log(resources)
        } catch (error) {
            console.log(error)
        }
    }

    let createNewTopic = () =>  {
        router.push(`/forum/${router.query.id}/poster`)
    }

    useEffect(() => {
        if (router.isReady) {
            if (!forumFetched) {
                fetchForum()
            }
            if (!resourcesFetched) {
                fetchResources()
            }
        }
    })

    return (
        <>
            <Nav />
            <main className="flex-shrink-0">
                <section style={{ 'backgroundColor':'#eee' }}>
                    <div className="container">
                        <h1 className="mt-5">Bienvenue sur le forum {forum.nom} </h1>
                        <p className="lead">{forum.description}</p>
                    </div>
                </section>

                <section>
                    <div className="d-flex flex-md-column border rounded m-5 p-4 bg-gray-300">
                        <div>
                            <button onClick={createNewTopic} type="button" className="btn btn-light border rounded">Nouveau topic</button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Sujet</th>
                                    <th scope="col">Auteur</th>
                                    <th scope="col">Date de publication</th>
                                    <th scope="col">Nombre de vue</th>
                                    <th scope="col">Nombre de commentaire</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resources.map((resource, index) => (
                                    <tr key={index}>
                                        <td>

                                            <FaRegFolder color="#f0ad4e" size="1.5em" />
                                        </td>
                                        <td>
                                            <Link href={`/forum/${router.query.id}/${resource.uniqueId}`}>{resource.titre}</Link>
                                        </td>
                                        <td>{resource.auteur}</td>
                                        <td>{resource.datePublication.toString()}</td>
                                        <td>{resource.nombreVue.toString()}</td>
                                        <td>{resource.commentaire.length}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger border rounded"><IoMdWarning /></button>
                                            <button type="button" className="btn btn-danger bordel rounded"><IoMdTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* table of resources */}
                </section>
            </main>
            <Footer />
        </>
    )
}