"use server"

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma"


interface CreateBookingParams {
    userId: string;
    date: Date;
    serviceId: string; 
   
}

export const createBooking = async (params: CreateBookingParams) => {
  await db.booking.create({
    data:  params,
  })
  revalidatePath("/barbershop/[Id]")
}

