import { Button } from "./button";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { Icon, MenuIcon } from "lucide-react";

const Header = () => {
    return ( 
        <Card>
            <CardContent className="flex  flex-row items-center justify-between " >
                <Image alt="logobarbearia"
                    src="/logobarbearia.png" 
                    width={130}
                    height={22} 
                />
                <Button size="icon" variant="outline">
                    <MenuIcon></MenuIcon>
                </Button>
        </CardContent>
        </Card>
     );
}
 
export default Header;