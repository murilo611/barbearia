"use client"
import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./sheet"
import { Calendar } from "./calendar"
import { pt } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { addDays, format, isPast, isToday, set } from "date-fns"
import { createBooking } from "@/app/_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "@/app/_actions/get-bookings"
import { Dialog, DialogContent } from "./dialog"
import SingInDialog from "../sing-in-dialog"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name" | "address">
}

const TIME_LIST = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
]

interface getTimeListProps { 
  selectedDay: Date
  bookings: Booking[]
}  

const getTimeList = ({bookings, selectedDay}: getTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])


    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }
    
   

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    if (hasBookingOnCurrentTime) {
      return false
    }

    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [singInDialogOpen, setSingInDialogOpen] = useState(false)
  const { data } = useSession()
  const [selectdDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetisOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    if (!selectdDay) return
    const fetch = async () => {
      const bookings = await getBookings({
        date: selectdDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectdDay, service.id])

  const handleBookingClick = () => { 
    if (data?.user) {
       return setBookingSheetIsOpen(true)
    }
      return   setSingInDialogOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    //2. nao permitir que usuario desconectado faça reservas (ver botao reservar )
    //3. alterar posicao do toast para o centro da tela
    try {
      if (!selectdDay || !selectedTime) return
      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])
      const newDate = set(selectdDay, {
        hours: hour,
        minutes: minute,
      })

      await createBooking({
        serviceId: service.id,
        date: newDate,
      })
      handleBookingSheetOpenChange()
      toast.success("Reserva criada com sucesso")
    } catch (error) {
      console.error("Erro ao criar reserva:", error)
      toast.error("Erro ao criar reserva")
    }
  }

  const timeList = useMemo(() => { 
    if (!selectdDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay: selectdDay
    })

  }, [selectdDay, dayBookings])
  

  return (
    <>
      <Card className="p-3 px-3">
        <CardContent className="flex items-center gap-3 px-0">
          {/* IMAGE */}
          <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* DIREITA */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>

            {/* PREÇO E BOTAO */}
            <div className="flex items-center justify-between">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat("pt-PT", {
                  style: "currency",
                  currency: "EUR",
                }).format(Number(service.price))}
              </p>
              <Sheet
                open={bookingSheetisOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={pt}
                      selected={selectdDay}
                      onSelect={handleDaySelect}
                      fromDate={addDays(new Date(),1)}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {/* TIME LIST */}
                  {selectdDay && (
                    <div className="flex-item flex gap-3 overflow-x-auto border-b border-solid p-5 pt-1 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? timeList.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          size="sm"
                          className="rounded-full"
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      )) : <p className="text-xs  text-gray-400">Não há horarios Disponíveis para datas selecionadas  </p>}
                        
                    </div>
                  )}

                  {/* CARD RESERVA */}
                  {selectedTime && selectdDay && (
                    <div className="px-5 py-1">
                      <Card>
                        <CardContent className="space-y-3 p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-PT", {
                                style: "currency",
                                currency: "EUR",
                              }).format(Number(service.price))}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(selectdDay, "d 'de' MMMM", {
                                locale: pt,
                              })}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Horário</h2>
                            <p className="text-sm">{selectedTime}</p>
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
                    </div>
                  )}

                  <SheetFooter className="px-5">
                    
                      <Button
                        size="sm"
                        onClick={handleCreateBooking}
                        disabled={!(selectedTime && selectdDay)}
                      >
                        Confirmar Reserva
                      </Button>
                   
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={singInDialogOpen} onOpenChange={(open) => setSingInDialogOpen (open)}>
        <DialogContent className="w-[90%]">
          <SingInDialog />
        </DialogContent>  
      </Dialog>
    </>
  )
}

export default ServiceItem