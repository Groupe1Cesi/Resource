import { Inter } from "next/font/google";
import Nav from "../components/client/nav";
import Footer from "../components/client/footer";
import Link from "next/link";
import RessourcesList from "@/components/client/ressource/ressourcesList";
const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
        <div className="d-flex flex-column h-100">
            <Nav />
            <main className="flex-shrink-0">
                <div className="container">
                    <h1 className="mt-5">Bienvenue sur Resource Relationnel</h1>
                    <p className="lead">Resource est une application permettant aux citoyens de trouver des documents ainsi que des informations liées à ces documents.</p>
                    <p>
                        <Link href="/auth/connexion"className="btn btn-primary">Connexion</Link>
                    </p>
                    <RessourcesList/>
                    <RessourcesList/>
                    <RessourcesList/>

                </div>
            </main>
            <Footer />
        </div>
  );
}
