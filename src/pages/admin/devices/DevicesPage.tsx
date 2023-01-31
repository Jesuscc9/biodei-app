import { Ring as Loader } from '@uiball/loaders'
import React from 'react'
import 'react-dropdown/style.css'
import { useNavigate } from 'react-router-dom'
import ProfileImage from '../../../assets/sample_icon.jpeg'
import { useDeleteDevice, useDevices } from '../../../hooks/models'
import { iDevice } from '../../../types'

export const DevicesPage = (): JSX.Element => {
  const { data: devices, isLoading, error } = useDevices()
  const { destroy } = useDeleteDevice()

  const navigate = useNavigate()

  const handleDeleteClick = (id: string): void => {
    destroy(id).catch((err) => {
      console.error(err)
    })
  }

  const handleCreateTicket = (id: string): void => {
    alert(id)
  }

  const handleNavigate = (device: iDevice): void => {
    navigate(`/admin/devices/${device.id}`)
  }

  if (error !== undefined) return <div className='text-red-500'>Tuvimos un error leyendo el inventario :c</div>

  return (
    <div className='p-20'>
      <div className='flex flex-col gap-10'>
        {isLoading ? (
          <Loader size={40} color='white' />
        ) : (
          <div className='relative overflow-x-auto mt-6 rounded-md'>
            <table className='w-full text-sm text-left text-gray-400'>
              <thead className='text-xs uppercase bg-zinc-700 text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Dispositivo
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Responsable
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Departamento
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Cliente
                  </th>
                  <th scope='col' colSpan={2} className='px-6 py-3'></th>
                </tr>
              </thead>
              <tbody>
                {devices?.map((device) => {
                  return (
                    <tr
                      className='border-b bg-zinc-800 border-zinc-300 hover:bg-zinc-700 cursor-pointer'
                      key={device.id}
                      onClick={() => handleNavigate(device)}
                    >
                      <th scope='row' className='px-6 py-4 whitespace-nowrap text-white'>
                        <p>{device.name}</p>
                        <p className='text-xs text-gray-400'>{device.internal_code}</p>
                      </th>
                      <td className='px-6 py-4 w-[140px]'>
                        <img src={ProfileImage} alt='' className='w-8 h-8 object-cover rounded-full' />
                      </td>
                      <td className='px-6 py-4'>{device.location}</td>
                      <Status device={device} />

                      <th className='px-6 py-4 text-white'>{device.user?.profile?.company_name}</th>

                      <td className='px-6 py-4'>
                        <button>Ver Detalles</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

const StatusClasses: Record<any, string> = {
  MAINTENANCE_REQUESTED: 'border-yellow-500 text-yellow-500',
  MAINTENANCE_ACCEPTED: 'border-orange-500 text-orange-500',
  MAINTAINED: 'border-green-500 text-green-500',
  DO_NOT_NEED_MAINTENANCE: 'border-gray-500 text-gray-500',
  MAINTAINING: 'border-blue-500 text-blue-500',
  NEEDS_MAINTENANCE: 'border-red-500 text-red-500',
}

const options = [
  { value: 'MAINTENANCE_ACCEPTED', label: 'Mantenimiento aceptado' },
  { value: 'MAINTAINED', label: 'Mantenimiento realizado' },
  { value: 'DO_NOT_NEED_MAINTENANCE', label: 'No necesita mantenimiento' },
  { value: 'MAINTAINING', label: 'Mantenimiento en proceso' },
  { value: 'NEEDS_MAINTENANCE', label: 'Necesita mantenimiento' },
]

const labels = {
  MAINTENANCE_REQUESTED: 'Mantenimiento solicitado',
  MAINTENANCE_ACCEPTED: 'Mantenimiento aceptado',
  MAINTAINED: 'Mantenimiento realizado',
  DO_NOT_NEED_MAINTENANCE: 'No necesita mantenimiento',
  MAINTAINING: 'Mantenimiento en proceso',
  NEEDS_MAINTENANCE: 'Necesita mantenimiento',
}

const Status = ({ device }: { device: iDevice }): JSX.Element => {
  return (
    <td className='px-6 py-4'>
      <div className='bg-green-600 px-4 py-2 text-white rounded-sm flex items-center gap-2'>
        <span className='w-2 h-2 block bg-white rounded-full'></span>
        Activo
      </div>
    </td>
  )
}
