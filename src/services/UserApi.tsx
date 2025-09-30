import Api from "./Api"

export interface User {
  userId: number
  name: string
  email: string
  phone: string
  countryOfOrigin: string
  city: string
  travelType: string
  bio: string
  avatar: string
  preferredLanguage: string
  preferences: {
    notifications: boolean
    culturalAlerts: boolean
    healthAlerts: boolean
    language: string
  }
}

export const UserApi = {
  getCurrentUser: async (id: number): Promise<User> => {
    const res = await Api.get(`/User/${id}`)
    return res.data
  },

  updateUser: async (id: number, data: Partial<User>): Promise<void> => {
    await Api.put(`/User/${id}`, data)
  }
}
