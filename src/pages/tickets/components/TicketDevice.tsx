import React from 'react'
import useSWR from 'swr'
import { iDevice } from '../../../types'
import { supabase } from '../../../services/supabaseService'

const getSingleDevice = async (params: string[]): Promise<iDevice> => {
  const [_, id] = params
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return (await supabase.from('device').select('*').eq('id', id).single()).data as iDevice
}

export const TicketDevice = ({ id }: { id: string }): JSX.Element => {
  const { data, error } = useSWR<iDevice>([`/devices/${id}`, id], getSingleDevice)

  const isLoading = data == null && error == null

  return (
    <div className='py-6'>
      <p className='font-bold text-blue-500'>Dispositivo:</p>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <p>
            <span className='font-bold'>Nombre: </span>
            {data?.name}
          </p>
          <p>
            <span className='font-bold'>Descripcion: </span>
            {data?.description}
          </p>
          <img src={data?.image_url} alt='' className='mt-2' width={200} />
        </div>
      )}
    </div>
  )
}
