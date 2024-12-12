'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { deleteData } from "@/utils/actions"

export default function ContactCard({ contact }) {

  const handleSubmit = async (contact) => {
    const data = await deleteData(contact)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{contact.customer_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{contact.customer_contact}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button
          onClick={() => handleSubmit(contact)}
        >
          Törlés
        </Button> */}
      </CardFooter>
    </Card>
  )
}
