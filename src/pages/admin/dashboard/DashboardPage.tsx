import React from 'react'
import { useClients, useInterns } from '../../../hooks/models'

export const DashboardPage = (): JSX.Element => {
  const { data: clients, isLoading: isLoadingClients } = useClients()
  const { data: interns, isLoading: isLoadingClient } = useInterns()

  console.log({ interns })

  return (
    <div className='p-20'>
      <h1>Panel de administrador</h1>
      {isLoadingClients ? (
        <div>Cargando...</div>
      ) : (
        <div>
          <p>Clientes:</p>
          <div className='flex mt-4'>
            {clients?.map((client) => (
              <div key={client.id} className='w-[400px] bg-zinc-700 rounded-md p-6 hover:bg-zinc-600 cursor-pointer'>
                <p className='text-lg m-0'>{client.profile?.first_name}</p>
                <p className='text-gray-400 text-sm mt-2'>{client.devices?.length} Dispositivo(s)</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
