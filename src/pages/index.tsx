import { Inter } from "next/font/google";
import Nav from "../components/client/nav";
import Footer from "../components/client/footer";
import Ressource from "@/components/client/ressource/ressource";
const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
        <div className="d-flex flex-column h-100">
            <Nav />
            <main className="flex-shrink-0">
                <div className="container">
                    <h1 className="mt-5">Bienvenue sur Resource Relationnel</h1>
                    <p className="lead">Resource est une application permettant aux citoyens de trouver des documents ainsi que des informations liées à ces documents.</p>
                    <Ressource/>
                    <Ressource/>
                    <Ressource/>
                </div>
            </main>
            <Footer />
        </div>
  );
}
