import { supabase } from "../services/supabaseClient"

export const validateUser = async () => {
  const data = localStorage.getItem("@stock.on/auth")

  if (!data) return null

  const dataFormatted = JSON.parse(data)

  const { data: user, error } = await supabase.auth.api.getUser(
    dataFormatted.session.access_token
  )

  if (error) {
    throw error
  }

  return user || null
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

  localStorage.setItem("@stock.on/auth", JSON.stringify(data))
  return data
}
