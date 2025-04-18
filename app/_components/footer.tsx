import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card className="rounded-none">
        <CardContent className="text-center">
          <p className="text-sm text-gray-400">
            © 2025 Copyright <span className="font-bold">MB Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
