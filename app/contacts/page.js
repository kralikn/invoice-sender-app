
// export const dynamic = "force-dynamic"

// import ContactCard from "@/components/contact-card"
// import { getContacts, getData } from "@/utils/actions"

// export default async function ContactsPage() {

//   const { data } = await getContacts()

//   const contacts = data || []
//   const error = data?.error || ''

//   console.log(contacts);

//   if (error) {
//     return <p className="text-md w-1/2 mx-auto px-8 py-4">{error}</p>
//   }

//   return (
//     <div className="flex flex-col items-center justify-center gap-6 p-8">
//       <div>
//         <h1 className="text-2xl text-center">Elérhetőségek</h1>
//       </div>
//       <div className="flex flex-col gap-6 w-1/2">
//         {contacts.map(contact => {
//           return (
//             <ContactCard key={contact.id} contact={contact} />
//           )
//         })}
//       </div>
//     </div>
//   )
// }
