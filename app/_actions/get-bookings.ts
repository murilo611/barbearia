"use server"


import { db } from "../_lib/prisma";
import { startOfDay, endOfDay } from "date-fns"; 

interface GetBookingsProps { 
    serviceId: string;
    date: Date;
}


export const getBookings = async({date} : GetBookingsProps) => {
    return db.booking.findMany({
        where: {
            date: {
                lte: endOfDay(date),
                 gte: startOfDay(date),
            },
        },
    })

 
 }