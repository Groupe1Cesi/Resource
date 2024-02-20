import type { NextPage } from 'next'
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';

let Login: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorSubmit, setErrorSubmit] = useState('')
    let errorCount = 0
    let router = useRouter()
    let [_, setCookie] = useCookies(['token'])
    // link to the register page
    let goToRegister = () => {
        router.push('/auth/register')
    }
    let goToHome = () => {
        router.push('/')
    }

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
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white" onClick={goToHome}>Resource</a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Connectez vous
                        </h1>
                        { errorSubmit && <p className="mt-6 text-center text-3xl font-extrabold text-red-500 text-xs italic">{errorSubmit}</p> }
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nom@email.fr" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre mot de passe</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" min="8" max="20" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                </div>
                                <div className='flex items-end'>
                                    <a className="items-end text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Mot de passe oublié ?</a>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Connexion</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Pas encore de compte ? <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={goToRegister}>Inscrivez-vous</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
