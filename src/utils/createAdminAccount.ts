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
        company_name: values?.company_name ?? '',
      },
    },
  }

  try {
    const res = await supabase.auth.signUp(body)

    console.info('Successfully created admin account')
    console.info({ res })

    console.info(body)
  } catch (e) {
    console.info('Error creating admin account')
    console.info({ e })
  }
}
