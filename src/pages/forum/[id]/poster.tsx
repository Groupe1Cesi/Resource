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
import ReactMarkdown from 'react-markdown';
import { FaRegFolder } from "react-icons/fa";
import { IoMdWarning, IoMdTrash } from "react-icons/io";

export default function Home(id: any) {
    let router = useRouter()
    // cookie
    let [token] = useCookies(['token'])
    const [titre, setTitre] = useState('');
    const [markdown, setMarkdown] = useState('');
    const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdown(e.target.value);
    };
    const [markdownAreaHeight, setMarkdownAreaHeight] = useState(16);

    const handleTitreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitre(e.target.value);
    }
    // button ``Poster`` on click post the topic

    let postTopic = async () => {
        //  titre, description, contenu, categorie
        let response: any
        try {
            response = await fetch(`/api/ressource/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.token
                },
                body: JSON.stringify({
                    titre: titre,
                    description: '',
                    contenu: markdown,
                    forum: router.query.id,
                    categorie: 'default'
                })
            }).then(res => res.json())
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // get window height
        window.addEventListener('resize', () => {
            console.log(window.innerHeight);
            setMarkdownAreaHeight(window.innerHeight);
        });
    })



    return (
        <>
            <Nav />
            <main className="flex-shrink-0">
                <section style={{ 'backgroundColor':'#eee' }}>
                    <div className="container">
                        <h1 className="mt-5">Poster un nouveau topic</h1>
                    </div>
                </section>

                <section>
                    <div className="d-flex flex-md-column border rounded m-5 p-4 bg-grey">
                        <div className="mb-4">
                            <input type="text" onChange={handleTitreChange} className="form-control" placeholder="Titre du topic" />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-floating">
                                 <textarea className="form-control" onChange={handleMarkdownChange} value={markdown} style={{height: markdownAreaHeight, overflow: 'hidden'}} id="floatingTextarea"></textarea>
                                  <label htmlFor="floatingTextarea">Topic</label>
                                </div>
                                {/* <textarea onChange={handleChange} value={markdown} /> */}
                            </div>
                            <div className="col-6 border rounded border-dark">
                                <ReactMarkdown>{markdown}</ReactMarkdown>
                            </div>
                        </div>
                        <div className="position-relative m-5 p-4">
                            <div className="position-absolute top-0 start-50 translate-middle">
                                <button onClick={postTopic} className="btn btn-success m-2">Poster</button>
                                <button className="btn btn-danger m-2">Annuler</button>
                            </div>
                            <div className="position-absolute top-0 start-100 translate-middle">
                                
                            </div>
                        </div>
                    </div>
                    {/* table of resources */}
                </section>
            </main>
            <Footer />
        </>
    )
}