import React from 'react'
import { iDevice } from '../../../types'
import { Button } from '../../../components'
import { useDeleteDevice } from '../../../hooks/models'

interface iProps {
  device: iDevice
}

export const Device = ({ device }: iProps): JSX.Element => {
  const { destroy, isLoading: isLoadingDelete } = useDeleteDevice()

  const handleDestroy = (id: string): void => {
    destroy(id).catch((e) => console.error(e))
  }

  return (
    <div key={device.id} className='flex flex-col items-start just p-6 border justify-between mt-10 rounded-md'>
      <div className='flex w-full justify-between'>
        <p className='font-bold text-xl'>{device.name}</p>
        <Button
          onClick={() => handleDestroy(device.id)}
          isLoading={isLoadingDelete}
          className='bg-red-500 rounded-md px-4 py-2 text-white'
        >
          Deleteee
        </Button>
      </div>
      <p className='text-gray-500'>{device.description}</p>
      <img src={device.image_url} className='' alt='' />
      <p className='text-gray-400 text-xs text-right'>{device.id}</p>
    </div>
  )
}
