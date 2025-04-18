import PhoneItem from "@/app/_components/phone-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import SidebarButton from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import ServiceItem from "@/app/_components/ui/service-item"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeft,  MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"



interface BarbershopPageProps {
  params: {
    id: string
  }
}



const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  //chamar meu banco de dados aqui
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    }
  })
    
  


    if (!barbershop)
    return notFound()

 
  

  return (
    <div>
      {/* IMAGEM*/}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop?.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
                  className="absolute top-4 left-4"
                  asChild
              >
                  <Link href="/">
                      <ChevronLeft />
          </Link>
           </Button>
       <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="secondary" className="absolute top-4 right-4">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
          </div>
          
          {/* IMAGEM*/}
          <div className="p-5 border-b border-solid">
              <h1 className="font-bold text-xl mb-3">{barbershop?.name}</h1>


              <div className="flex items-center mb-2 gap-2">
                  <MapPinIcon className="text-primary " size={18}></MapPinIcon> 
                  <p className=""> {barbershop?.address}</p>
              </div>
             
               

               <div className="flex items-center gap-2">
                  <StarIcon className="text-primary fill-primary" size={18}></StarIcon> 
                  <p className=""> 5.0 (388 avaliações)</p>

              </div>
          </div>
          
          {/* Descrição*/}

          <div className="p-5 border-b border-solid space-y-2">
          <h2 className=" uppercase font-bold text-gray-400 text-xs">Sobre Nós</h2>
          <p className="text-sm text-justify">{barbershop?.description }</p>

      </div>
      {/* Serviços*/}
      <div className="p-5">
        <h2 className="mb-3 text-xs  font-bold text-gray-400 uppercase">Serviços</h2>
       <div className="space-y-3 text-sm text-gray-400"> {barbershop.services.map((service) =>  <ServiceItem key={service.id} service={service} />) } </div>
      </div>

      {/* Contacto*/}
      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone) => (
        <PhoneItem phone ={phone} key={phone} />
         
        ))}
      </div>

      </div>
  )
}

export default BarbershopPage