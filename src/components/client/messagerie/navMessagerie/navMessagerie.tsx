import Link from "next/link";
import {Button} from "@nextui-org/react";


export default function NavMessagerie () {

    return (
      <div>
          <div className={"d-flex flex-row "}>
              <Button className={"border-2 p-1 flex-1"}><Link href={"/"}>Messages</Link></Button>
              <Button className={"border-2 p-1 flex-1"}><Link href={"/"}>Envoyer</Link></Button>
              <Button className={"border-2 p-1 flex-1"}><Link href={"/"}>Non-Lus</Link></Button>
              <Button className={"border-2 p-1 flex-1"}><Link href={"/"}>Corbeille</Link></Button>
          </div>
      </div>
    );
}