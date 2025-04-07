
import { SearchIcon } from "lucide-react";
import { Button } from "./_components/ui/button";
import Header from "./_components/ui/header";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./_components/ui/avatar";


export default function Home() {
  return (
    <div className=" p-5">

      {/*Header} */}

      <Header />
      <div>
      <h2 className="text-xl fonte-blod mt-5" >Olá Murilo</h2>
        <p>Domingo. 06 de Março de 2025</p>

        {/*Busca}*/}
        <div className="mt-6 flex items-center gap-2"> 
          <Input placeholder="Buscar Barbearias" />
          <Button size={"icon"} variant="outline" >
            <SearchIcon />
          </Button>
        </div>


        {/*Banner} */} 
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende seus serviços nos melhores salões"
            src="/banner01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/*Agendamento} */}
        <Card className="mt-6">
          <CardContent className="flex justify-between ">
           
            {/*Esqueda} */}
            <div className="flex flex-col gap-2 pl-0">
            <Badge className="w-fit "> Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo </h3>

              {/*Avatar */}
             <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png"></AvatarImage>
                </Avatar>
                <p className="text-sm">Barbearia do Murilo</p>

              
              </div>
            </div>
            {/*Direita*/}
            <div className="flex flex-col  items-center justify-center border-solid border-l-2 px-5">
              <p className="text-sm">Fevereiro</p>
              <p className="text-2x1 ">06</p>
              <p className="text-sm ">09:45</p>
      
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
  
  );
}


