export interface UserProjects {
  id: number
  created_at: string
  user_id?: string | null
  invited_email: string
  isAdmin: boolean
  project_id: number
}
