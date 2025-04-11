import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./card"
import Image from "next/image"
import { Button } from "./button"
import { Badge } from "./badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"
    
interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[167px} max-w-[167px] rounded-2xl py-0">
      <CardContent className="p-0 px-1 pt-1">
        {/* IMAGEM */}
        <div className="relative h-[159px] w-[159px]">
          <Image
            fill
            className="rounded-2xl object-cover"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />
          <Badge
            className="absolute top-2 left-2 space-x-1 opacity-80"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/* TEXTO */}
        <div className="px-1 py-2">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link
              href={`/barbershops/${barbershop.id}`}
              className=" w-full"
           >
              Reservar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem