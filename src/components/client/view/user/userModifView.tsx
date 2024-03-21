import {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { User } from '@/types/user';
let UserModifView = (props: {user: User}) => {
    const [prenom, setPrenom] = useState(props.user.prenom)
    const [nom, setNom] = useState(props.user.nom)
    const [email, setEmail] = useState(props.user.email)
    const [region, setRegion] = useState(props.user.region)
    const [regions, setRegions] = useState([])
    const [regionFetched, setRegionFetched] = useState(false)
    const [regionNameDefaut, setRegionNameDefaut] = useState('')
    const [loading, setLoading] = useState(true)
    const [_, setCookie] = useCookies(['token'])
    const [changed, setChanged] = useState(false)

    const fetchRegions = async () => {
        const response = await fetch('/api/regions')
        const res = await response.json()
        setRegions(res)
        setLoading(false)
    }

    let saveUserInfo = () => {
        if (nom === '' || prenom === '' || email === '' || region === ''){
            return
        }
        let body = {}
        if (nom !== props.user.nom){
            body = {...body, nom}
        }
        if (prenom !== props.user.prenom){
            body = {...body, prenom}
        }
        if (email !== props.user.email){
            body = {...body, email}
        }
        if (region !== props.user.region){
            body = {...body, region}
        }

        fetch('/api/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': _.token
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(res => {
            if(res.status === 'success'){
                setChanged(false)
                // refresh page
                window.location.reload()
            }
        }).catch(err => {
            console.log(err)
        })
        return
    }

    

    useEffect(() => {
        if (!regionFetched){
            setRegionFetched(true)
            fetchRegions()
        }
    }, [regionFetched]);

    return (
        <>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Nom</p>
                        </div>
                        <div className="col-sm-9">
                        <input type="text" className="form-control" name="nom" id="nom" placeholder="Nom" required value={nom} onChange={(e) => {setNom(e.target.value), setChanged(true)}}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Prenom</p>
                        </div>
                        <div className="col-sm-9">
                        <input type="text" className="form-control" name="prenom" id="prenom" placeholder="Prenom" required value={prenom} onChange={(e) => {setPrenom(e.target.value), setChanged(true)}}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                            <input type="email" className="form-control" name="email" id="email" placeholder="Email" required value={email} onChange={(e) => {setEmail(e.target.value), setChanged(true)}}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Region</p>
                        </div>
                        <div className="col-sm-9">
                            <select className="form-select" name="region" id="region" value={region} onChange={(e) => {setRegion(e.target.value), setChanged(true)}}>

                                {loading ? <option>Loading...</option> : regions.map((region: {code: string, nom: string}) => {
                                    return <option key={region.code} value={region.code}>{region.nom}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    {changed && (
                        <>
                        <hr/>
                        <div className="row">
                            <button type="button" onClick={saveUserInfo} className="btn btn-success">Sauvegarder</button>
                        </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export { UserModifView }