import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import {useEffect, useState } from "react";

// type user 

type User = {
    prenom: string,
    nom: string,
}

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
        let res = await fetch(`/api/user/info`, { method: "GET", headers: { "Authorization": _.token } }).then(res => res.json())
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
    }, [])
  
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <Image src="/next.svg" alt="logo" width={30} height={24}/>
                    </Link>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link href="#" className="nav-link px-2 text-secondary">Accueil</Link></li>
                        <li><Link href="#" className="nav-link px-2 text-white">Forum</Link></li>
                        <li><Link href="#" className="nav-link px-2 text-white">Dernier topic</Link></li>
                        { user ? <li><Link href="#" className="nav-link px-2 text-white">Message</Link></li> : null }
                        { user ? <li><Link href="#" className="nav-link px-2 text-white">Mon Compte</Link></li>: null }
                    </ul>
                    <div className="text-end">
                        { user ? <p className="text-white me-2">Bonjour {user.prenom} {user.nom}</p> : ''}
                        { user ? <button type="button" className="btn btn-outline-light me-2" onClick={logout}>Déconnexion</button> : ''}
                        { user ? null : <Link href="/auth/connexion" className="btn btn-outline-light me-2">Connexion</Link>}
                        { user ? null : <Link href="/auth/inscription" className="btn btn-warning">Inscription</Link>}
                    </div>
                </div>
            </div>
        </header>
    )
  }