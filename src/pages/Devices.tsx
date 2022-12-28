import React from 'react'
import { useDevices } from '../hooks/models/'
import { InsertDeviceForm } from '../components/forms'

export const DevicesPage = (): JSX.Element => {
  const { data: devices } = useDevices()

  return (
    <div className='mt-10'>
      <div className='p-10'>
        <h1 className='mb-10'>Estos son los devices</h1>
        <code className='text-xs'>
          <pre>{JSON.stringify(devices, null, 2)}</pre>
        </code>
      </div>
      <InsertDeviceForm />
    </div>
  )
}
