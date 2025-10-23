import Api from "./Api"
import type { User } from "../types"

export const UserApi = {
  getCurrentUser: async (id: number): Promise<User> => {
    const res = await Api.get(`/User/${id}`)
    return res.data
  },

  updateUser: async (id: number, data: Partial<User>): Promise<void> => {
    await Api.put(`/User/${id}`, data)
  }
}
