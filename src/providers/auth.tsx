import { supabase } from "../services/supabaseClient"

export const validateUser = () => {
  return supabase.auth.user()
}

export const signOut = () => {
  const { access_token } = supabase.auth.session()

  return supabase.auth.api.signOut(access_token).then(() => {
    localStorage.removeItem("supabase.auth.token")
  })
}

export const signIn = async ({ email, password }) => {
  const data = await supabase.auth.signIn({ email, password })

  if (data.error) {
    throw data.error
  }

  return data
}
