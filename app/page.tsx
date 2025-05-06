import Header from "./_components/ui/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/ui/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/ui/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { authOptions } from "./_lib/auth"
import { getServerSession } from "next-auth"

const Home = async () => {
  // CHAMR MEU BANCO DE DADOS
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })




  const bookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
      },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        <h2 className="mt-6 text-xl font-bold">Olá, Jimmy</h2>
        <p>Domingo, 14 de agosto</p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
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

         {/* RECOMENDADOS */}
        <h2 className="mt-6  text-xs font-bold text-gray-400 uppercase">
         Agendamentos
        </h2>

        {/* AGENDAMENTO - TODO: receber agendamentos como propriedade */}
        <div className="flex gap-3 pt-5 overflow-auto [&::-webkit-scrollbar]:hidden">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        {/* RECOMENDADOS */}
        <h2 className="mt-6 pb-5 text-xs font-bold text-gray-400 uppercase">
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
    </div>
  )
}

export default Home