import Image from "next/image";
import { Inter } from "next/font/google";
import Nav from "../components/client/view/nav";
import Footer from "../components/client/view/footer";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
        <div className="d-flex flex-column h-100">
            <Nav />
            <main className="flex-shrink-0">
                <div className="container">
                    <h1 className="mt-5">Bienvenue sur Resource</h1>
                    <p className="lead">Resource est une application permettant aux citoyens de trouver des documents ainsi que des informations liées à ces documents.</p>
                    <p>
                        <Link href="/auth/connexion"className="btn btn-primary">Connexion</Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
  );
}
