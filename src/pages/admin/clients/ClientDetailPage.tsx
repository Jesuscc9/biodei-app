import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, DevicesTable } from '../../../components'
import { useClient } from '../../../hooks/models'

export const ClientDetailPage = (): JSX.Element => {
  const params = useParams()
  const { clientId } = params

  const { data: client, isLoading } = useClient(clientId)

  if (isLoading) return <div>Cargando...</div>

  if (client?.devices == null) return <div>Cargandoo</div>

  return (
    <div className='px-20 py-10'>
      <div className='flex justify-between items-start'>
        <div>
          <h1 className='text-3xl font-bold'>
            {client.profile?.company_name}{' '}
            <span className='px-3 py-1.5 text-xs font-normal rounded-full'>{client.devices.length} dispositivo(s)</span>
          </h1>

          <p className='text-lg text-zinc-400 mt-1'>
            {client.profile?.first_name} {client.profile?.last_name}
          </p>
        </div>
        <Link to='devices/new'>
          <Button>Agregar dispositivo +</Button>
        </Link>
      </div>
      <br />
      <DevicesTable devices={client?.devices} />
    </div>
  )
}
