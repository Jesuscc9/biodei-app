import { supabase } from '../services/supabaseService'

export const emailAdmin = 'jesusuper9@gmail.com'

export const createAdminAccount = async (): Promise<any> => {
  const values: Record<string, string> = {
    email: emailAdmin,
    password: '123456',
    first_name: 'Jesus',
    last_name: 'Cervantes',
    role: 'ADMIN',
  }

  const body = {
    email: values.email,
    password: values.password,
    options: {
      data: {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        role: values.role,
      },
    },
  }

  try {
    const res = await supabase.auth.signUp(body)

    console.log('Successfully created admin account')
    console.log({ res })

    console.log(body)
  } catch (e) {
    console.log('Error creating admin account')
    console.log({ e })
  }
}
