
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button"; 
import { signIn } from "next-auth/react";
import Image from "next/image";

const SingInDialog = () => {
    const handleLoginWithGoogle = () => signIn("google")

    return (
        <>
        
                <DialogHeader>
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google
                  </DialogDescription>
                </DialogHeader>

                <Button
                  variant="outline" 
                  className="gap-1 font-bold"
                  onClick={handleLoginWithGoogle}
                >
                  <Image
                    src="/google.svg"
                    width={18}
                    height={18}
                    alt="logo google"
                  />
                  Google
                </Button>
           
        </>
    );
}
 
export default SingInDialog;