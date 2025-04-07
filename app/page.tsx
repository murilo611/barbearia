
import { SearchIcon } from "lucide-react";
import { Button } from "./_components/ui/button";
import Header from "./_components/ui/header";
import { Input } from "./_components/ui/input";
import Image from "next/image";


export default function Home() {
  return (
    <div className=" p-5">
      <Header />
      <div>
      <h2 className="text-xl fonte-blod mt-5" >Olá Murilo</h2>
        <p>Domingo. 06 de Março de 2025</p>
        <div className="mt-6 flex items-center gap-2"> 
          <Input placeholder="Buscar Barbearias" />
          <Button size={"icon"} variant="outline" >
            <SearchIcon />
          </Button>
        </div>
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende seus serviços nos melhores salões"
            src="/banner01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        </div>
      </div>
  
  );
}


