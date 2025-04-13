import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./button";
import { Card, CardContent } from "./card";

interface ServiceItemProps{
    service: BarbershopService;
 
}

const ServiceItem = ({ service }: ServiceItemProps) => {
    return (
        <Card className=" p-3 px-0 ">
            <CardContent className="px-3 flex items-center gap-3 "  >
                
            {/* Image*/ }
            <div className="relative max-h-[110px] max-w-[110px] min-h-[110px] min-w-[110px] ">
                <Image 
                    alt={service.name}
                    src={service.imageUrl}
                    fill className="rounded-lg object-cover"/>  



            </div>

 {/* Direita*/ }
            <div className="space-y-2">
                <h3 className="font-bold text-sm">{service.name}</h3>
                <p className="text-sm text-gray-400">{service.description}</p>
                
                 {/* Preço e Botao */}
            <div className="flex items-center justify-between ">
                <p className="text-primary text-sm font-bold ">{Intl.NumberFormat("pt-PT", {
                    style: "currency",
                    currency: "EUR",

                    }).format (Number(service.price))} 
                </p>
                        <Button variant="secondary" size="sm">Reservar</Button>
            </div>
            </div>
        
        
            </CardContent>
       </Card>
           
        
     );
}
 
export default ServiceItem;