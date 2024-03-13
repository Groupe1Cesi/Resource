import type { NextPage } from 'next'
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/client/footer';

let Inscription: NextPage = () => {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordWrong, setPasswordWrong] = useState('');
    const [errorSubmit, setErrorSubmit] = useState('')
    const [annee, setAnnee] = useState(new Date().getFullYear());
    let errorCount = 0
    let router = useRouter()
    let [_, setCookie] = useCookies(['token'])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setPasswordWrong('Les mots de passe ne correspondent pas')
            return
        }
        if (email === '' || password === '' || passwordConfirmation === '') {
            setErrorSubmit('Tous les champs sont requis')
            return
        }
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prenom, nom, email, password }),
        });
        console.log(response)
        if (response.ok) {
            const data = await response.json()
            setCookie('token', data.token, { path: '/' })
            router.push('/')
        } else {
            console.log(response.status)
            if (response.status === 500) {
                setErrorSubmit(`Erreur lors de la création du compte ... nouvel essai ${errorCount}`)
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
                                                        </div>
                                                        <h4 className="text-center">Bienvenue parmi nous !</h4>
                                                        { errorSubmit && <p className="text-center text-danger">{errorSubmit}</p> }
                                                    </div>
                                                </div>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row gy-3 overflow-hidden">
                                                    <div className="col-12">
                                                        <div className="form-floating mb-3">
                                                            <input type="text" className="form-control" name="prenom" id="prenom" placeholder="Prénom" required value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
                                                            <label htmlFor="prenom" className="form-label">Votre prénom</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-floating mb-3">
                                                            <input type="text" className="form-control" name="nom" id="nom" placeholder="Nom" required value={nom} onChange={(e) => setNom(e.target.value)}/>
                                                            <label htmlFor="nom" className="form-label">Votre nom</label>
                                                        </div>
                                                    </div>
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
                                                        <div className="form-floating mb-3">
                                                            <input type="password" className="form-control" name="password" id="password" placeholder="Password" required value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                                                            <label htmlFor="password" className="form-label">Confirmez votre mot de passe</label>
                                                            { passwordWrong && <p className="text-center text-danger">{passwordWrong}</p> }
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            <button className="btn btn-dark btn-lg" type="submit">S&apos;inscrire</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                                                        <Link href="/auth/connexion" className="link-secondary text-decoration-none">Déjà un compte ? Se connecter</Link>
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
        <Footer/>
    </>
    )

/*     return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créez votre compte
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              { errorSubmit && <p className="text-red-500 text-xs italic">{errorSubmit}</p> }
              <label htmlFor="email-address" className="sr-only">Adresse email</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
            { passwordWrong && <p className="text-red-500 text-xs italic">{passwordWrong}</p> }
              <label htmlFor="passwordConfirmation" className="sr-only">Confirmation du mot de passe</label>
              <input id="passwordConfirmation" name="passwordConfirmation" type="password" autoComplete="current-password" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmation du mot de passe"
                value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            </div>
            <div>
              <button type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Créer un compte
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) */
}

export default Inscription;