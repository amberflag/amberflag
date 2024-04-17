export interface Project {
  id: number
  created_at?: string
  emoji?: string
  name: string
  isActivated: boolean
  uuid: string
  environments: string[]
  integration_key: string
  integration_token: string
  isAdmin?: boolean
}

export interface CreateProject {
  name: string
  emoji?: string
}
