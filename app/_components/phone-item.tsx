"use client"
import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const copyPhone = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(phone)
    } else {
      const el = document.createElement("textarea")
      el.value = phone
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    }
    toast.success("Contacto copiado com sucesso!", {
      position: "bottom-center",
    })
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <Button variant="outline" size="sm" onClick={copyPhone}>
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem