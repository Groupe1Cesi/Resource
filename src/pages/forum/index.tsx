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
import { useForum } from "@/components/client/hook/useForum";

export default function Home() {
    let [Forums, setForums] = useState<Forums>([]);
    let [forumFetched, setForumFetched] = useState(false)
    
    let fetchForums = async () => {
        let response: Forums = []
        try {
            response = await fetch('/api/regions').then(res => res.json())
            setForums(response)
            setForumFetched(true)
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(() => {
        fetchForums()
    })

    return (
        <>
            <Nav />
            <main className="flex-shrink-0">
                <section style={{ 'backgroundColor':'#eee' }}>
                    <div className="container">
                        <h1 className="mt-5">Bienvenue sur le forum</h1>
                        <p className="lead">Resource est une application permettant aux citoyens de trouver des documents ainsi que des informations liées à ces documents.</p>
                        <div className="row">
                            {Forums.map((forum: Forum, index: number) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card mb-4 shadow-sm">
                                        <div className="card-body">
                                            <h5>{forum.nom}</h5>
                                            <p className="card-text">{forum.description}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <Link href={`/forum/${forum.code}`}>
                                                        <a className="btn btn-sm btn-outline-secondary">Voir</a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
