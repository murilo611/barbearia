"use client"

import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { Calendar } from "./calendar";
import { pt } from "date-fns/locale";
import { useState } from "react";


interface ServiceItemProps{
    service: BarbershopService;
 
}

const ServiceItem = ({ service }: ServiceItemProps) => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined) 
    const handleDaySelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    return (
      <Card className="p-3 px-0">
        <CardContent className="flex items-center gap-3 px-3">
          {/* Image*/}
          <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* Direita*/}
          <div className="space-y-2">
            <h3 className="text-sm font-bold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>

            {/* Preço e Botao */}
            <div className="flex items-center justify-between">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat("pt-PT", {
                  style: "currency",
                  currency: "EUR",
                }).format(Number(service.price))}
              </p>
              <Sheet>
                <SheetTrigger>
                  <Button variant="secondary" size="sm">
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

               <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={pt}
                      selected={selectedDay}
                        onSelect={handleDaySelect}
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

                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    )
}
 
export default ServiceItem;