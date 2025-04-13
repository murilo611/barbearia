"use client"

import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";



interface PhoneItemProps {
    phone: string;
}

const PhoneItem = ({ phone }:PhoneItemProps) => {
    
    const handleCopyPhone = (phone:string) => {  navigator.clipboard.writeText(phone)}
    return ( 

         <div className="flex justify-between" key={phone}>
            {/* Esquerda*/}
            <div className=" flex items-center gap-2"> <SmartphoneIcon />
              <p className="text-sm">{phone}</p>
            </div>


            {/* Direita*/}
           <Button variant="outline" onClick={() => handleCopyPhone(phone)}>Copiar</Button>





          </div>
     );
}
 
export default PhoneItem;