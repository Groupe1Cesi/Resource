import type { NextPage } from 'next'
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/client/footer';

let Connexion: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorSubmit, setErrorSubmit] = useState('')
    const [annee, setAnnee] = useState(new Date().getFullYear());
    let errorCount = 0
    let router = useRouter()
    let [_, setCookie] = useCookies(['token'])

    if (_?.token) {
        try {
            fetch('/api/auth/verif', {
            method: 'GET',
            headers: {
                'Authorization': _?.token
            }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    router.push('/')
                }
            })
        } catch (error) {
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setErrorSubmit('Tous les champs sont requis')
            return
        }
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
             body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json()
            setCookie('token', data.token, { path: '/' })
            router.push('/')
        } else {
            console.log(response.status)
            if (response.status === 500) {
                setErrorSubmit(`Erreur lors de la connexion ... nouvel essai ${errorCount}`)
                errorCount++
                await handleSubmit(e)
                return
            }
            const data = await response.json()
            setErrorSubmit(data.message)
            return
        }
    };
    return (
    <>
        <main className="p-3 p-md-4 p-xl-5 bg-dark bg-gradient">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xxl-11">
                        <div className="card border-light-subtle shadow-sm">
                            <div className="row g-0">
                                <div className="col-12 col-md-6 loginBackground">
                                    
                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="col-12 col-lg-11 col-xl-10">
                                        <div className="card-body p-3 p-md-4 p-xl-5">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="mb-5">
                                                        <div className="text-center mb-4">
                                                            {/* <Image src="/images/logo/logo.png" alt="logo" width={153} height={100}/> */}
                                                        </div>
                                                        <h4 className="text-center">Bon retour parmi nous !</h4>
                                                        { errorSubmit && <p className="text-center text-danger">{errorSubmit}</p> }
                                                    </div>
                                                </div>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row gy-3 overflow-hidden">
                                                    <div className="col-12">
                                                        <div className="form-floating mb-3">
                                                            <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                                            <label htmlFor="email" className="form-label">Votre email</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-floating mb-3">
                                                            <input type="password" className="form-control" name="password" id="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                                            <label htmlFor="password" className="form-label">Votre mot de passe</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            <button className="btn btn-dark btn-lg" type="submit">Se connecter</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                                                        <Link href="/auth/inscription" className="link-secondary text-decoration-none">Pas encore de compte ?</Link>
                                                        <Link href="/auth/inscription" className="link-secondary text-decoration-none">Mot de passe oublié</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="d-flex justify-content-center mt-5">
                                                        <Link href="/" className="btn btn-dark" type="submit">Retourner à l&apos;accueil</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </>
    );
}

export default Connexion;
