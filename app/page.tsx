import { SearchIcon } from "lucide-react"
import Header from "./_components/ui/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/ui/barbershop-item"

const Home = async () => {
  // CHAMR MEU BANCO DE DADOS
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        <h2 className="mt-6 text-xl font-bold">Olá, Murilo</h2>
        <p>Domingo, 14 de agosto</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Encontre um serviço ou salão" />
          <Button size={"icon"}>
            <SearchIcon />
          </Button>
        </div>

        {/* Busca rapida */}
        <div className="flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden ">
          <Button variant={"secondary"} className="mt-6">Cabelo 
          <Image src="cabelo.svg" width={16} height={16}  alt="cabelo"/>
          </Button>

          <Button variant={"secondary"} className="mt-6">Barba 
          <Image src="barba.svg" width={16} height={16}  alt="cabelo"/>
          </Button>

          <Button variant={"secondary"} className="mt-6">Acabamento 
          <Image src="acabamento.svg" width={16} height={16}  alt="cabelo"/>
          </Button>

           <Button variant={"secondary"} className="mt-6">Sombrancelha
          <Image src="sobrancelha.svg" width={16} height={16}  alt="cabelo"/>
          </Button>

           <Button variant={"secondary"} className="mt-6">Massagem 
          <Image src="massagem.svg" width={16} height={16}  alt="cabelo"/>
          </Button>

          <Button variant={"secondary"} className="mt-6">Hidratação
          <Image src="hidratacao.svg" width={16} height={16}  alt="cabelo"/>
          </Button>

       

          
        </div>

        

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende seus serviços nos melhores salões"
            src="/banner01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/* AGENDAMENTO */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Pentelho</h3>

              {/* AVATAR */}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png"></AvatarImage>
                </Avatar>
                <p className="text-sm">Barbearia do Murilo</p>
              </div>
            </div>

            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">14</p>
              <p className="text-sm">14:30</p>
            </div>
          </CardContent>
        </Card>
        {/* AGENDAMENTO */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* POPULARES */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <footer> 
      {/* FOOTER */}
      <Card className="mt-6 rounded-none">
        <CardContent className="px-5">
         <p className="text-sm"> © 2025 Copyrigth <span> Murilo Boaro.</span></p> 
        </CardContent>
      </Card>
      </footer>
    </div>
  )
}

export default Home