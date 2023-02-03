export interface IProfiles {
  id: string
  name: string
  email: string
  isAdmin: boolean
  created_at: Date
  verified: boolean
}

export interface IProfilePostActivePayload {
  id: string
  verified: boolean
}
