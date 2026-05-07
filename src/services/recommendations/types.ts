export type RecommendationEffort = 'easy' | 'medium' | 'advanced'

export type Recommendation = {
  id: string
  title: string
  description: string
  effort: RecommendationEffort
}
