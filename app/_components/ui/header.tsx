import { Button } from "./button";
import { Card, CardContent } from "./card";
import Image from "next/image";
import {  CalendarIcon,  HomeIcon, LogOut, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent,  SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { quickSaearchOptions } from "@/app/_constants/search";
import { Avatar, AvatarImage } from "./avatar";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between">
        <Image
          alt="logo barbearia"
          src="/logoBarbearia.png"
          width={120}
          height={18}
        />

        {/* SHEET MENU*/}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader className="pb-0">
              <SheetTitle className="ml-2">Menu</SheetTitle>
            </SheetHeader>

            <div className="mx-5 flex items-center border-b border-solid pb-5 gap-2">
              <Avatar>
                <AvatarImage
                  src="/avatar.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                          </Avatar>
                          <div>
                              <p className="text-lg font-bold">João</p>
                              <p className="text-sm">joao@gmail.com</p>
                      </div>
                      
            </div>

            <div className="mx-5 flex flex-col gap-1 border-b border-solid py-5">
            <SheetClose asChild>
              <Button className="justify-start gap-2" variant="ghost" asChild>
                <Link href={"/"}>
                <HomeIcon size={18} /> 
                Início</Link>
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
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header