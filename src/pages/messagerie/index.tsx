import Nav from "@/components/client/nav";
import Footer from "@/components/client/footer";
import React from "react";
import NavMessagerie from "@/components/client/messagerie/navMessagerie/navMessagerie";


export default function Messagerie(){
   return (
       <div className="d-flex flex-column h-100">
           <Nav/>
           <main className="flex-shrink-0">
               <NavMessagerie/>
           </main>
            <Footer/>
       </div>
   );
}