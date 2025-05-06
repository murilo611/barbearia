
import Header from "../_components/ui/header";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { notFound } from "next/navigation";
import BookingItem from "../_components/ui/booking-item";
import { date } from "zod";

const Bookings = async () => {
    const session = await getServerSession(authOptions)



    if (!session?.user) {
        return notFound()
    }
    const confirmedBookings = await db.booking.findMany({
        where: {
            userId: (session?.user as any).id,
            date: {
                gte: new Date()
            }
        }, 
        include: {
            service: {
                include: {
                barbershop: true,
            }, 
            },
        },
        take: 5,
        orderBy: {
            date: "asc",
        }
    })


    

    const FinalizedBookings = await db.booking.findMany({
        where: {
            userId: (session?.user as any).id,
            date: {
                lt: new Date(),
            },
        }, 
        include: {
            service: {
                include: {
                    barbershop: true,
                }, 
            },
        },
        take: 5,
        orderBy: {
            date: "desc",
        }


    })

    return (
        <>
            <Header />


       

            <div className="p-5 space-y-3">
                <h1 className="text-lx fonte-bold ">Agendamentos</h1>
                     <h2 className="py-5  text-xs font-bold text-gray-400 uppercase">
          Confirmados
        </h2>
                {confirmedBookings.map((booking) =>
                    <BookingItem key={booking.id} booking={booking} />
                )}
            </div>

                 <h2 className="p-5 mb-3 text-xs font-bold text-gray-400 uppercase">
          Finalizados
        </h2>
            <div className="p-5 space-y-3">
            
                {FinalizedBookings.map((booking) =>
                    <BookingItem key={booking.id} booking={booking} />
                )}
            </div>
                
        


        </>
    );
}
 
export default Bookings;