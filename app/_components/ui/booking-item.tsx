import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { isFuture } from "date-fns";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import Image from "next/image";
import PhoneItem from "../phone-item";


interface BookingItemProps { 
  booking: Prisma.BookingGetPayload<{ 
    include: { 
      service: {
        include: { 
          barbershop: true
        }
      }
    }
  }>
}


const BookingItem = ({ booking }: BookingItemProps) => {
  const { service: { barbershop } } = booking;
  const isConfirmed = isFuture(booking.date)

  
   return (
   <Sheet>
      <SheetTrigger className="min-w-full">
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "outline"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>

              {/* AVATAR */}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={booking.service.barbershop.imageUrl}
                  ></AvatarImage>
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: pt })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: pt })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: pt })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative mx-5 flex h-[180px] items-end mt-6">
          <Image
            src="/maps.jpg"
            fill
            alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
            className="rounded-xl object-cover"
           />
           {/* Acertar a posição */}
          <Card className="z-50 mx-5 mb-3 w-full p-0 rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} alt="Barbearia" />
              </Avatar>
              <div>
                <h3 className="truncate font-bold">{barbershop.name}</h3>
                <p className="truncate text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
         </div>
         <div className="mt-6 mx-5">
           <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "outline"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
           </Badge>



                      <Card className="mt-3 mb-6">
                        <CardContent className="space-y-3 p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{booking.service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-PT", {
                                style: "currency",
                                currency: "EUR",
                              }).format(Number(booking.service.price))}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(booking.date, "d 'de' MMMM", {
                                locale: pt,
                              })}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Horário</h2>
                            <p className="text-sm">{format(booking.date, `HH:mm`)}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Local</h2>

                            <a
                              className="text-sm"
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                barbershop.address,
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {barbershop.address}
                            </a>
                          </div>
                        </CardContent>
           </Card>
           <div className="space-y-3">
              {barbershop.phones.map(phone => <PhoneItem key={phone} phone={phone} />
           
           )}
          </div>
         </div>
      </SheetContent>
    </Sheet>
  )
}
 
export default BookingItem;