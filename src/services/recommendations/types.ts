export type RecommendationEffort = 'easy' | 'medium' | 'advanced'

export type RecommendationImpact = 'low' | 'medium' | 'high'

export type RecommendationLink = {
  label: string
  url: string
}

export type Recommendation = {
  id: string
  title: string
  description: string
  why: string
  steps: string[]
  links: RecommendationLink[]
  tradeoffs: string[]
  impact: RecommendationImpact
  effort: RecommendationEffort
  dynamic: boolean
}
