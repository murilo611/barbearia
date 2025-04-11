import { BookImageIcon, SearchIcon } from "lucide-react"
import Header from "./_components/ui/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/ui/barbershop-item"
import { quickSaearchOptions } from "./_constants/search"
import BookingItem from "./_components/ui/booking-item"


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
        <div className=" mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden ">
          {quickSaearchOptions.map((option) => (<Button className="gap-2 " variant="secondary" key={option.title}>
         
            <Image src={option.imageUrl} width={16} height={16} alt={option.title} />
            
            {option.title}
          </Button>
        ))}
          
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
        {/* AGENDAMENTO - Todo: receber agendamentos propriedade */}

        <BookingItem></BookingItem>
        
        {/* Recomendados */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* POPULARES */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
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
            <p className="text-sm">© 2025 Copyright <span>Murilo Boaro</span></p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home