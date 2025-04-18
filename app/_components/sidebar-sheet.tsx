import {  CalendarIcon,  HomeIcon, LogOutIcon, } from "lucide-react";
import { quickSaearchOptions } from "@/app/_constants/search";
import Image from "next/image";
import Link from "next/link";
import {  SheetClose, SheetContent, SheetHeader, SheetTitle, } from "./ui/sheet";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";




const SidebarSheet = () => {
    return ( 
          
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
           );
}
 
export default SidebarSheet;