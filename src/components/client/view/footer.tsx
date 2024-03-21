import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import {useEffect, useState } from "react";

export default function Footer(){
    let [annee, setDate] = useState(new Date().getFullYear())

    return(
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container">
                <span className="text-muted">© {annee} Resource. Tous droits réservés.</span>
            </div>
        </footer>
    )
}