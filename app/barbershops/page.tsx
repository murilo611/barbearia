import BarbershopItem from "../_components/ui/barbershop-item"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  })
  return (
    <div>
      <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
        Resultados para &quot;{searchParams.search}&quot;
      </h2>

      <div className="grid grid-cols-2 gap-4 py-5">
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopsPage
