'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createData } from "@/utils/actions"
import { useForm } from "react-hook-form"

export default function UploadPage() {

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  })

  const onSubmit = async (values) => {
    const data = await createData(values)
    if (!data?.error) {
      form.reset()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <div>
        <h1 className="text-2xl text-center">Feltöltés</h1>
      </div>
      <div className="w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cím</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tartalom</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={15}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Mentés</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}


