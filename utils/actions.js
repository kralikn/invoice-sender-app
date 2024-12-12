'use server'

import { createClient } from "./supabase/server";
import { revalidatePath } from 'next/cache'
import sql from 'mssql';
import { ClientSecretCredential } from '@azure/identity';

const credential = new ClientSecretCredential(
  process.env.TENANT_ID,
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

const config = {
  server: 'kraliken-server.database.windows.net',
  database: 'ContactListDB',
  options: {
    encrypt: true
  },
  authentication: {
    type: 'azure-active-directory-access-token',
    options: {
      token: await credential.getToken('https://database.windows.net/.default').then(token => token.token)
    }
  }
};

export async function connectDB() {
  try {
    const poolConnection = await sql.connect(config)
    return poolConnection
  } catch (error) {
    console.error(error)
    return
  }
}

'SELECT * FROM [ContactListDB].[dbo].[customer_contacts] INNER JOIN [ContactListDB].[dbo].[customers] ON [dbo].[customer_contacts].[customer_name] = [dbo].[customers].[id]'

export async function getContacts() {
  try {
    const dbConnect = await connectDB()
    if (dbConnect) {
      // const contacts = await dbConnect.request().query(`SELECT * FROM [ContactListDB].[dbo].[customer_contacts]`)
      const contacts = await dbConnect.request().query(`SELECT * FROM [ContactListDB].[dbo].[customer_contacts] INNER JOIN [ContactListDB].[dbo].[customers] ON [ContactListDB].[dbo].[customer_contacts].[customer_id] = [ContactListDB].[dbo].[customers].[id]`)
      return { data: contacts.recordset }
    }
    return { error: 'Nem sikerült csatlakozni az adatbázishoz.' }
  } catch (error) {
    console.error(error)
    return { error: 'Valami hiba történt...' }
  }
}
export async function createData(values) {

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('azure_table')
      .insert(values)
      .select()

    if (!data) {
      console.log(error)
      return { error: 'Nem sikerült menteni a jegyzetet!' }
    }
    return { data }
  } catch (error) {
    console.error(error)
    return { error: 'Valami hiba történt...' }
  }
}
export async function deleteData(values) {

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('azure_table')
      .delete()
      .eq('id', values.id)
      .select()

    if (!data) {
      console.log(error)
      return { error: 'Nem sikerült menteni a jegyzetet!' }
    }
    revalidatePath('/get')
    return { data }
  } catch (error) {
    console.error(error)
    return { error: 'Valami hiba történt...' }
  }
}