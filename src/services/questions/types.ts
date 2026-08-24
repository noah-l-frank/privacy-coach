export type QuestionOption = {
  value: string
  label: string
}

export type SingleChoiceQuestion = {
  id: string
  type?: 'single_choice'
  title: string
  description: string
  options: QuestionOption[]
}

export type ToggleQuestionItem = {
  id: string
  label: string
  yesValue: string
  noValue: string
}

export type ToggleGroupQuestion = {
  id: string
  type: 'toggle_group'
  title: string
  description: string
  items: ToggleQuestionItem[]
}

export type FollowUpQuestion = SingleChoiceQuestion | ToggleGroupQuestion
