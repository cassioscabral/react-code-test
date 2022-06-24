import messyData from '../data/json-generated-no-id-mess-data.json'

export interface UserInterface {
  name?: string
  email?: string
  isActive?: boolean
  phone?: string
}

export function listUsers(): UserInterface[] {
  return messyData as UserInterface[]
}
