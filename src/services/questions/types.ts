export type QuestionOption = {
  value: string
  label: string
}

export type FollowUpQuestion = {
  id: string
  title: string
  description: string
  options: QuestionOption[]
}
