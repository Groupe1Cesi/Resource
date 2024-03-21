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
import { UserInfoView } from "@/components/client/view/user/userInfoView";
import { UserModifView } from "@/components/client/view/user/userModifView";
const inter = Inter({ subsets: ["latin"] });
import { Regions, Region } from "@/types/region";

export default function Home() {
    
    const [user, setUser] = useState<User>({id: '', nom: '', prenom: '', email: '', region: ''});
    const [mod, setMod] = useState(false)
    const [region, setRegion] = useState<string>('')
    let router = useRouter()
    let [_, setCookie] = useCookies(['token'])

    let { data } = useRegion()

    let GetUser = async () => {
        try {
            if(user.id === ''){
                let res = await fetch(`/api/user`, { method: "GET", headers: { "Authorization": _.token } }).then(res => res.json())
                setUser(res.user)
            }
        } catch (error) {
            router.push('/auth/connexion')
        }

    }
    let toggleModify = () => {
        setMod(!mod)
    }

    let regionList = async () => {
        for(let regionFetched of data){
            if (regionFetched.code === user?.region){
                setRegion(regionFetched.nom.toString())
            }
        }
    }


    useEffect(() => {
        GetUser()
        regionList()
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
                                        <Image src="/images/bg/bg4.jpg" width={210} height={210} alt="avatar" className=" img-fluid" />
                                        <h5 className="my-3">{ user ? user.nom : ''} {user ? user.prenom : ''}</h5>
                                        <div className="d-flex justify-content-center mb-2">
                                            {/* <button type="button" className="btn btn-primary">Follow</button>
                                            <button type="button" className="btn btn-outline-primary ms-1">Message</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">

                                { region && mod ? (
                                 <UserModifView user={user}/>
                                ): (
                                 <UserInfoView user={user} region={region}/>
                                )}
                                <div className="col-sm-8">
                                    { mod ? (<button className="btn btn-primary" onClick={toggleModify}>Annuler</button>) : (<button className="btn btn-primary" onClick={toggleModify}>Modifier</button>) }
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
