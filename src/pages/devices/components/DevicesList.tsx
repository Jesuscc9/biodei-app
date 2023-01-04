import React from 'react'
import { useDevices } from '../../../hooks/models'

export const DevicesList = (): JSX.Element => {
  const { data: devices, isLoading } = useDevices()

  return (
    <div className='flex flex-col gap-10'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='relative overflow-x-auto mt-6 rounded-md'>
          <table className='w-full text-sm text-left text-gray-400'>
            <thead className='text-xs uppercase bg-zinc-700 text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Nombre
                </th>
                <th scope='col' className='px-6 py-3'>
                  Descripcion
                </th>
                <th scope='col' className='px-6 py-3'>
                  Codigo interno
                </th>
                <th scope='col' className='px-6 py-3'>
                  Codigo externo
                </th>

                <th scope='col' className='px-6 py-3'>
                  Marca
                </th>
                <th scope='col' className='px-6 py-3'>
                  Modelo
                </th>
                <th scope='col' className='px-6 py-3'>
                  Numero serial
                </th>
                <th scope='col' className='px-6 py-3'>
                  Ubicacion
                </th>
                <th scope='col' className='px-6 py-3'>
                  Imagen
                </th>
              </tr>
            </thead>
            <tbody>
              {devices?.map((device) => {
                return (
                  <tr className='border-b bg-zinc-800 border-zinc-300' key={device.id}>
                    <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {device.name}
                    </th>
                    <td className='px-6 py-4'>{device.description}</td>
                    <td className='px-6 py-4'>{device.external_code}</td>
                    <td className='px-6 py-4'>{device.internal_code}</td>
                    <td className='px-6 py-4'>{device.brand}</td>
                    <td className='px-6 py-4'>{device.model}</td>
                    <td className='px-6 py-4'>{device.serial_number}</td>
                    <td className='px-6 py-4'>{device.location}</td>
                    <td className='py-3 w-40'>
                      <img src={device.image_url} alt='' />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
