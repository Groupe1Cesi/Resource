import type { NextPage } from 'next'
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';

let Register: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordWrong, setPasswordWrong] = useState('');
    const [errorSubmit, setErrorSubmit] = useState('')
    let errorCount = 0
    let router = useRouter()
    let [_, setCookie] = useCookies(['token'])

    let goToLogin = () => {
        router.push('/auth/login')
    }
    let goToHome = () => {
        router.push('/')
    }
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
            body: JSON.stringify({ email, password }),
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
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <button className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white" onClick={goToHome}>Resource</button>
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
                                <input type="password" name="password" id="password" min="8" max="20" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmation du mot de passe</label>
                                <input type="password" name="passwordConfirm" id="passwordConfirm" min="8" max="20" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                { passwordWrong && <p className="text-red-500 text-xs italic">{passwordWrong}</p> }
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Connexion</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Vous possèdez un compte ? <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={goToLogin}>Connectez vous</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
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

export default Register;