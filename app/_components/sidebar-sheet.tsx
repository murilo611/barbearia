"use client"

import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  PanelBottom,
} from "lucide-react"
import { quickSaearchOptions } from "@/app/_constants/search"
import Image from "next/image"
import Link from "next/link"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, useSession } from "next-auth/react"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleloginWithGoogle = () => signIn("google")

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader className="pb-0">
        <SheetTitle className="ml-2">Menu</SheetTitle>
      </SheetHeader>

      <div className="mx-5 flex items-center justify-between gap-3 border-b border-solid pb-5">
        <h2 className="font-bold">Olá Faça seu Login !</h2>

        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={data?.user.image ?? ""}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Avatar>
            <div>
              <p className="text-lg font-bold">{data.user.name}</p>
              <p className="text-sm">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Olá Faça o login na Plataforma !</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta Google
                  </DialogDescription>
                </DialogHeader>

                <Button
                  variant="outline"
                  className="gap-1 font-bold"
                  onClick={handleloginWithGoogle}
                >
                  <Image
                    src="/google.svg"
                    width={18}
                    height={18}
                    alt="icon google"
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="mx-5 flex flex-col gap-1 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href={"/"}>
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="mx-5 flex flex-col gap-1 border-b border-solid py-5">
        {quickSaearchOptions.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-2"
            variant="ghost"
          >
            <Image
              src={option.imageUrl}
              alt={option.title}
              width={18}
              height={18}
            />
            {option.title}
          </Button>
        ))}
      </div>

      <div className="mx-5 flex flex-col gap-1 border-b border-solid py-5">
        <Button className="justify-start gap-2" variant="ghost">
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
