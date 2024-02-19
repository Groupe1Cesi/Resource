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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setPasswordWrong('Les mots de passe ne correspondent pas')
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
  )
}

export default Register;