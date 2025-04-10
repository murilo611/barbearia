import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./card"
import Image from "next/image"
import { Button } from "./button"
import { Badge } from "./badge"
import { StarIcon } from "lucide-react"
    
interface BarbershopItemProps{
    barbershop: Barbershop  
}


const BarbershopItem = ({ barbershop }: BarbershopItemProps ) => {
    return <Card className="min-w-[167px] py-0 round 2xl">
        <CardContent className="p-0 px-1 pt-1">

       
             

            
            <div className="relative  h-[159px] w-full ">
                <Image fill className="object-cover rounded-2xl"
                    src={barbershop.imageUrl}
                    alt={barbershop.name} />
                <Badge className="absolute top-2 left-2 bg space-x1  opacity-80" variant= "secondary">  
                
                    <StarIcon size={12} className="fill-primary text-primary">  </StarIcon> 
                    <p className="text-xs font-semibold">5.0</p>
                </Badge>
            </div>
            
            <div className="py-3 px-1"> 
                <h3 className="font-semibold truncate ">{barbershop.name}</h3>
                <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
                <Button variant="secondary" className="mt-3 w-full">Reservar</Button>


            </div>
        </CardContent>        

        </Card>
}
 


export default BarbershopItem