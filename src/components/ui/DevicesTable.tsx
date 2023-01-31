import React from 'react'
import { useDeleteDevice, useUser } from '../../hooks/models'
import { iDevice } from '../../types'
import { Button } from './Button'

interface iProps {
  devices: iDevice[]
}

export const DevicesTable = ({ devices }: iProps): JSX.Element => {
  const { data: user } = useUser()

  const role = user?.role ?? 'CLIENT'

  return (
    <div className='relative overflow-x-auto mt-6 rounded-md'>
      <table className='w-full text-sm text-left text-gray-400'>
        <thead className='text-xs uppercase bg-zinc-700 text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Nombre
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
            <th scope='col' className='px-6 py-3'>
              Marca
            </th>
            <th scope='col' className='px-6 py-3'>
              Modelo
            </th>
            <th scope='col' className='px-6 py-3'>
              Ubicacion
            </th>
            <th scope='col' className='px-6 py-3'>
              Imagen
            </th>
            <th scope='col' colSpan={2} className='px-6 py-3'>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {devices?.map((device) => {
            return (
              <tr className='border-b bg-zinc-800 border-zinc-300 hover:bg-zinc-700' key={device.id}>
                <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-white'>
                  {device.name}
                </th>
                <Status device={device} />
                <td className='px-6 py-4'>{device.brand}</td>
                <td className='px-6 py-4'>{device.model}</td>
                <td className='px-6 py-4'>{device.location}</td>
                <td className='py-3 w-24 h-24 object-cover'>
                  <img src={device.image_url} alt='' />
                </td>
                <td className='px-6 py-4'>
                  <div className='flex gap-4'>
                    {role === 'CLIENT' ? <Button>Solicitar mantenimiento</Button> : null}
                    <DeleteButton device={device} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const DeleteButton = ({ device }: { device: iDevice }): JSX.Element => {
  const { destroy, isLoading: isLoadingDelete } = useDeleteDevice()

  const handleDeleteClick = (id: string): void => {
    destroy(id).catch((err) => {
      console.error(err)
    })
  }

  return (
    <Button
      type='button'
      className='bg-red-500 hover:bg-red-600 m-auto rounded-md px-4 py-2 text-white capitalize'
      onClick={() => handleDeleteClick(device.id)}
      isLoading={isLoadingDelete}
    >
      Borrar
    </Button>
  )
}

const StatusClasses: Record<string, string> = {
  MAINTENANCE_REQUESTED: 'border-yellow-500 text-yellow-500',
  MAINTENANCE_ACCEPTED: 'border-orange-500 text-orange-500',
  MAINTAINED: 'border-green-500 text-green-500',
  DO_NOT_NEED_MAINTENANCE: 'border-gray-500 text-gray-500',
  MAINTAINING: 'border-blue-500 text-blue-500',
  NEEDS_MAINTENANCE: 'border-red-500 text-red-500',
}

const Status = ({ device }: { device: iDevice }): JSX.Element => {
  const hasAnyTicket = true

  return (
    <>
      {hasAnyTicket ? (
        <td className='px-6 py-4'>
          {/* <div
            className={`bg-zinc-800 border-2 text-xs py-1.5 px-3 rounded-full whitespace-nowrap font-semibold uppercase w-min ${
              StatusClasses[lastTicket?.maintenance_type ?? '']
            }`}
          >
            MANTENIMIENTO EN ESPERA DE ASIGNACION
            {lastMaintenance.title === 'MAINTENANCE_REQUESTED' &&
              `Mantenimiento ${lastMaintenance.type === 'PREVENTIVE' ? 'preventivo' : 'correctivo'} solicitado`}
          </div> */}
          <div className='border-green-500 text-white border-2 font-semibold flex items-center gap-3 text-xs py-2 px-3 rounded-full whitespace-nowrap w-min'>
            <span className='w-2 h-2 block bg-green-500 rounded-full'></span>
            Activo
          </div>
        </td>
      ) : (
        <td className='px-6 py-4'>
          <div className='bg-zinc-800 text-gray-400 border-2 font-semibold border-gray-400 text-xs py-1.5 px-3 rounded-full whitespace-nowrap w-min uppercase'>
            Inactivo
          </div>
        </td>
      )}
    </>
  )
}
