import Image from "next/image"


import { MenuIcon } from "lucide-react"

import Link from "next/link"
import { Card, CardContent } from "./card"
import { Sheet, SheetTrigger } from "./sheet"
import { Button } from "./button"
import SidebarSheet from "../sidebar-sheet"


const Header = () => {
  return (
    <Card className="rounded-none ">
      <CardContent className="flex flex-row items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            alt="logo barbearia"
            src="/logoBarbearia.png"
            width={120}
            height={18}
          />
        </Link>

        {/* SHEET MENU*/}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header