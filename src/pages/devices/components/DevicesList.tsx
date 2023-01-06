import React, { useState } from 'react'
import { Ring as Loader } from '@uiball/loaders'
import { useDeleteDevice, useDevices } from '../../../hooks/models'
import { iDevice, iMaintenanceTitles } from '../../../types'
import Dropdown, { Option } from 'react-dropdown'
import 'react-dropdown/style.css'
import { Modal } from '../../../components'
import { Link } from 'react-router-dom'

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
                  Status
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
                <th scope='col' className='px-6 py-3'></th>
              </tr>
            </thead>
            <tbody>
              {devices?.map((device) => {
                return (
                  <tr className='border-b bg-zinc-800 border-zinc-300 hover:bg-zinc-700' key={device.id}>
                    <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-white'>
                      {device.name}
                    </th>
                    <td className='px-6 py-4 w-[140px]'>{device.description}</td>
                    <Status device={device} />
                    <td className='px-6 py-4'>{device.external_code}</td>
                    <td className='px-6 py-4'>{device.internal_code}</td>
                    <td className='px-6 py-4'>{device.brand}</td>
                    <td className='px-6 py-4'>{device.model}</td>
                    <td className='px-6 py-4'>{device.serial_number}</td>
                    <td className='px-6 py-4'>{device.location}</td>
                    <td className='py-3 w-24 h-24 object-cover'>
                      <img src={device.image_url} alt='' />
                    </td>
                    <td className='px-6 py-4'>
                      <button onClick={() => handleDeleteClick(device.id)}>Borrar</button>
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

const StatusClasses: Record<iMaintenanceTitles, string> = {
  MAINTENANCE_REQUESTED: 'border-yellow-500 text-yellow-500',
  MAINTENANCE_ACCEPTED: 'border-orange-500 text-orange-500',
  MAINTAINED: 'border-green-500 text-green-500',
  DO_NOT_NEED_MAINTENANCE: 'border-gray-500 text-gray-500',
  MAINTAINING: 'border-blue-500 text-blue-500',
  NEEDS_MAINTENANCE: 'border-red-500 text-red-500',
}

const Status = ({ device }: { device: iDevice }): JSX.Element => {
  const lastMaintenance = device?.maintenance?.[device.maintenance.length - 1]

  const hasMaintenance = lastMaintenance !== undefined

  return (
    <>
      {hasMaintenance ? (
        <td className='px-6 py-4'>
          <div
            className={`bg-zinc-800 border-2 text-xs py-1.5 px-3 rounded-full whitespace-nowrap font-semibold uppercase w-min ${
              StatusClasses[lastMaintenance.title]
            }`}
          >
            {lastMaintenance.title === 'MAINTENANCE_REQUESTED' &&
              `Mantenimiento ${lastMaintenance.type === 'PREVENTIVE' ? 'preventivo' : 'correctivo'} solicitado`}
          </div>
        </td>
      ) : (
        <td className='px-6 py-4'>
          {/* <Dropdown
            options={options}
            placeholder='Solicita mantenimiento'
            onChange={handleChange}
            controlClassName='custom-dropdown'
          /> */}

          <div className='bg-zinc-800 text-gray-400 border-2 font-semibold border-gray-400 text-xs py-1.5 px-3 rounded-full whitespace-nowrap w-min uppercase'>
            Inactivo
          </div>

          <Link to={`maintenance?deviceId=${device.id}`}>
            <button type='button' className='underline text-gray-300 text-xs whitespace-nowrap mt-2'>
              Solicita mantenimiento
            </button>
          </Link>
        </td>
      )}
    </>
  )
}
