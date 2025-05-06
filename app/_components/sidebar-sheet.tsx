"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import SingInDialog from "./sing-in-dialog"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader className="pb-0">
        <SheetTitle className="ml-2">Menu</SheetTitle>
      </SheetHeader>

      <div className="mx-5 flex items-center justify-between gap-3 border-b border-solid pb-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={data?.user?.image ?? ""}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-sm">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá Faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                <SingInDialog />
                </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="mx-5 flex flex-col gap-1 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost" asChild>
          <Link href={"/bookings"}>

          <CalendarIcon size={18} />
            Agendamentos
            </Link>
        </Button>
      </div>

      <div className="mx-5 flex flex-col gap-1 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <SheetClose asChild key={option.title}>
            <Button
              key={option.title}
              className="justify-start gap-2"
              variant="ghost"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={18}
                  height={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>
       
      {data?.user && (
      <div className="mx-5 flex flex-col gap-1 border-b border-solid py-5">
        <Button
          className="justify-start gap-2"
          variant="ghost"
          onClick={handleLogoutClick}
        >
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet