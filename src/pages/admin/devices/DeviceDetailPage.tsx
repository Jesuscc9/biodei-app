import React from 'react'
import { useParams } from 'react-router-dom'
import { useDevice } from '../../../hooks/models'
import { timeAgoFormat } from '../../../utils'

export const DeviceDetailPage = (): JSX.Element => {
  const params = useParams()

  const { deviceId } = params

  const { data: device, isLoading, error } = useDevice(deviceId)

  if (isLoading) return <div>Cargando...</div>

  if (error !== undefined) return <div>Error cargando este dispositivo</div>

  return (
    <div className='p-20'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-2xl'>{device?.name}</h1>
        <p>{device?.description}</p>
        <img src={device?.image_url} className='w-60' alt='' />
        <p className='text-sm text-gray-400 text-right'>{timeAgoFormat(new Date(device?.created_at ?? ''))}</p>
      </div>
    </div>
  )
}
