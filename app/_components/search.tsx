"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { SearchIcon } from "lucide-react"

const Search = () => {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSubmit = () => {
  router.push(`/barbershops?search=${search}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Encontre um serviço ou salão"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button size={"icon"} onClick={handleSubmit}>
        <SearchIcon />
      </Button>
    </div>
  )
}

export default Search
