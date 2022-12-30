import React from 'react'
import { useDeleteDevice, useDevices } from '../hooks/models/'
import { InsertDeviceForm, Button } from '../components/'

export const DevicesPage = (): JSX.Element => {
  const { data: devices, isLoading } = useDevices()

  const { destroy, isLoading: isLoadingDelete } = useDeleteDevice()

  const handleDestroy = (id: string): void => {
    destroy(id).catch((e) => console.error(e))
  }

  return (
    <div className='mt-10'>
      <div className='p-10'>
        <h1 className='mb-10'>Estos son los devices</h1>
        <div className='flex flex-col gap-10'>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {devices?.map((e) => {
                return (
                  <div key={e.uuid} className='flex items-start justify-between text-xs gap-2'>
                    <code className='text-xs'>{JSON.stringify(e, null, 2)}</code>
                    <Button
                      onClick={() => handleDestroy(e.uuid ?? '')}
                      isLoading={isLoadingDelete}
                      className='bg-red-500 rounded-md px-4 py-2 text-white'
                    >
                      Deleteee
                    </Button>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
      <InsertDeviceForm />
    </div>
  )
}
