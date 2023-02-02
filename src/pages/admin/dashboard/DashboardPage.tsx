import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../components'
import { useClients } from '../../../hooks/models'

export const DashboardPage = (): JSX.Element => {
  const { data: clients, isLoading: isLoadingClients } = useClients()

  const anyClient = clients != null && clients?.length > 0

  return (
    <div className='p-20'>
      {isLoadingClients ? (
        <div>Cargando...</div>
      ) : (
        <div>
          <div className='flex justify-between'>
            <p>{anyClient ? 'Clientes: ' : 'Aún no hay ningún cliente registrado.'}</p>
            <Link to='new'>
              <Button>Registrar Cliente +</Button>
            </Link>
          </div>
          <div className='flex mt-4 gap-10'>
            {clients?.map((client) => (
              <Link to={client.id} key={client.id}>
                <div className='w-[400px] bg-zinc-700 rounded-md p-6 hover:bg-zinc-600 cursor-pointer'>
                  <p>{client.profile?.company_name}</p>
                  <p className='text-lg m-0'>
                    {client.profile?.first_name} {client.profile?.last_name}
                  </p>

                  <p className='text-gray-400 text-sm mt-2'>{client.devices?.length} Dispositivo(s)</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
