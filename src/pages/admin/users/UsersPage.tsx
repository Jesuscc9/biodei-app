import React from 'react'
import { InsertUserForm } from '../../../components/forms/models/user/InsertUserForm'

export const UsersPage = (): JSX.Element => {
  return (
    <div>
      <h1 className='text-xl'>Registra a un cliente</h1>
      <InsertUserForm></InsertUserForm>
    </div>
  )
}
