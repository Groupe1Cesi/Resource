import Image from "next/image";
import { Inter } from "next/font/google";
import Nav from "@/components/client/nav";
import Footer from "@/components/client/footer";
import Link from "next/link";
import {useEffect, useState } from "react";
import { User } from "@/types/user"
import { useCookies } from "react-cookie";
import useSWR from 'swr'
const inter = Inter({ subsets: ["latin"] });


export default function Home() {
    
    const [user, setUser] = useState(null as User | null);
    let [_, setCookie] = useCookies(['token'])

    let GetUser = async () => {
        if(!user){
            // get slug
            
            let slug
            let res = await fetch(`/api/user`, { method: "GET", headers: { "Authorization": _.token } }).then(res => res.json())
            console.log(res.user)
            setUser(res.user)
        }
    }


    useEffect(() => {
        GetUser()
    });

    return (
        <div className="d-flex flex-column h-100">
            <Nav />
            <main className="flex-shrink-0">
                <section style={{ 'backgroundColor':'#eee' }}>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <Image src="/images/bg/bg4.jpg" width={150} height={150} alt="avatar" className="rounded-circle img-fluid" />
                                        <h5 className="my-3">{ user ? user.nom : ''} {user ? user.prenom : ''}</h5>
                                        <div className="d-flex justify-content-center mb-2">
                                            {/* <button type="button" className="btn btn-primary">Follow</button>
                                            <button type="button" className="btn btn-outline-primary ms-1">Message</button> */}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="card mb-4 mb-lg-0">
                                    <div className="card-body p-0">
                                        <ul className="list-group list-group-flush rounded-3">
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fas fa-globe fa-lg text-warning"></i>
                                                <p className="mb-0">https://mdbootstrap.com</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fab fa-github fa-lg" style={{"color": "#333333"}}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fab fa-twitter fa-lg" style={{"color": "#55acee"}}></i>
                                                <p className="mb-0">@mdbootstrap</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fab fa-instagram fa-lg" style={{"color": "#ac2bac"}}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fab fa-facebook-f fa-lg" style={{"color": "#3b5998"}}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Nom</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ user ? user.nom : ''}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Prenom</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ user ? user.prenom : ''}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ user ? user.email : ''}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Region</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">Pays de la loire</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
