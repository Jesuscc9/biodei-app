import { Ring as Loader } from '@uiball/loaders'
import React from 'react'
import 'react-dropdown/style.css'
import { Link } from 'react-router-dom'
import { useDeleteDevice, useDevices } from '../../../hooks/models'
import { iDevice } from '../../../types'

export const DevicesList = (): JSX.Element => {
  const { data: devices, isLoading, error } = useDevices()
  const { destroy } = useDeleteDevice()

  const handleDeleteClick = (id: string): void => {
    destroy(id).catch((err) => {
      console.error(err)
    })
  }

  if (error !== undefined) return <div className='text-red-500'>Tuvimos un error leyendo el inventario :c</div>

  return (
    <div className='flex flex-col gap-10'>
      {isLoading ? (
        <Loader size={40} color='white' />
      ) : (
        <div className='relative overflow-x-auto mt-6 rounded-md'>
          <div>{JSON.stringify(devices)}</div>
        </div>
      )}
    </div>
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
  const hasAnyTicket = device.tickets != null && device.tickets?.length > 0

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
          <div className='bg-green-600 px-4 py-2 text-white rounded-md flex items-center gap-2 w-min'>
            <span className='w-2 h-2 block bg-white rounded-full'></span>
            Activo
          </div>
        </td>
      ) : (
        <td className='px-6 py-4'>
          <div className='bg-zinc-800 text-gray-400 border-2 font-semibold border-gray-400 text-xs py-1.5 px-3 rounded-full whitespace-nowrap w-min uppercase'>
            Inactivo
          </div>

          <Link to={`ticket?deviceId=${device.id}`}>
            <button type='button' className='underline text-gray-300 text-xs whitespace-nowrap mt-2'>
              Solicita mantenimiento
            </button>
          </Link>
        </td>
      )}
    </>
  )
}
