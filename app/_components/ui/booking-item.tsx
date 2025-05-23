"use client"

import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { isFuture } from "date-fns";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import Image from "next/image";
import PhoneItem from "../phone-item";
import { Button } from "./button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import { deleteBooking } from "@/app/_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";

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
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { service: { barbershop } } = booking;
  const isConfirmed = isFuture(booking.date)
  const handleCancelBooking = async () => {
    try { 
      
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso") 
    }
    catch (error) { 
      console.error(error)
      toast.error("Erro ao cancelar a reserva")
    }
  }
  
  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(true)
  }
   return (
   <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
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
         <SheetFooter>
           <div className="flex itemns-center gap-3 ">
             <SheetClose >
               <Button variant="outline" className="flex-1 ">Voltar</Button>
             </SheetClose>
             {isConfirmed && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex-1">
                    Cancelar Reserva
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Você tem certeza que deseja cancelar a reserva?
                    </AlertDialogTitle>
                    <AlertDialogDescription>  
                      A ação não pode ser desfeita. Cancelamentos podem estar
                      sujeitos a taxas. Voce tem certeza que deseja cancelar a
                      sua reserva?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row">
                    <AlertDialogCancel className="flex-1">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction asChild className="flex-1">
                      <Button variant="destructive" onClick={handleCancelBooking}>Continuar</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
                 
             )}
            
              

             
           </div>
      </SheetFooter>

      </SheetContent>
    </Sheet>
  )
}
 
export default BookingItem;