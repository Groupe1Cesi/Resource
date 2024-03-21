import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import {useEffect, useState } from "react";
import { User } from "@/types/user"

export default function Nav(){
    const router = useRouter()
    const [user, setUser] = useState(null as User | null);
    const [userinfosCalled, setUserinfosCalled] = useState(false)
    let [_, setCookie] = useCookies(['token'])
    let logout = () => {
        setCookie('token', '', { path: '' })
        setTimeout(() => {
            router.push('/auth/connexion')
        }, 1000);
    }
    let GetUser = async () => {
        let res = await fetch(`/api/user`, { method: "GET", headers: { "Authorization": _.token } }).then(res => res.json())
        return res;
    }
    
    let userinfos = async () => {
        if (_.token !== undefined && _.token !== null && _.token !== "") {
            if (!userinfosCalled) {
                setUserinfosCalled(true)
                let res = await GetUser()
                if (res.status === "success") {
                    setUser(res.user)
                }
                if (res.status === "failed") {
                    setTimeout(() => {
                        setUserinfosCalled(false)
                        router.push('/auth/connexion')
                    },1000)
                }
                if (res.status === "error") {
                    setCookie('token', null, { path: '/' })
                    router.push('/auth/connexion')
                }
            }
        }
    }
    useEffect(() => {
        userinfos()
    })
  
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Image src="/images/logo/logo_ressource.png" alt="logo" width={80} height={80}/>
                    {/* {router.asPath == "/" ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"} */}
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link href="/" className={router.asPath == "/" ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"}>Accueil</Link></li>
                        <li><Link href="/forum" className={router.asPath == "/forum" ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"}>Forum</Link></li>
                        <li><Link href="/forum/dernier" className={router.asPath == "/forum/dernier" ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"}>Dernier topic</Link></li>
                        { user ? <li><Link href="/messagerie" className={router.asPath == "/messagerie" ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"}>Message</Link></li> : null }
                        { user ? <li><Link href="/utilisateur" className={router.asPath == "/moncompte" ? "nav-link px-2 text-secondary" : "nav-link px-2 text-white"}>Mon Compte</Link></li>: null }
                    </ul>
                    <div className="nav justify-content-center">
                        {user ? <Link href="#" className="btn text-white px-2">Bonjour {user.prenom} {user.nom}</Link> : null}
                        {user ? <button type="button" className="btn btn-outline-light px-2" onClick={logout}>Déconnexion</button> : null}
                        {user ? null : <Link href="/auth/connexion" className="btn btn-outline-light px-2">Connexion</Link>}
                        {user ? null : <Link href="/auth/inscription" className="btn btn-warning px-2">Inscription</Link>}
                        <Image src={"/images/picture/profil-picture.png"} alt="Image de profil" width={50} height={50} className={"mr-4 ml-6"}/>

                        <div className={"flex-col"}>
                            <p>Nom</p>
                            <p>Prenom</p>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    )
  }