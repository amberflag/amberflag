export interface Project {
  id: number
  created_at?: string
  emoji?: string
  name: string
  isActivated: boolean
  uuid: string
  environments: string[]
  integration_id: string
  integration_token: string
}

export interface CreateProject {
  name: string
  emoji?: string
}
