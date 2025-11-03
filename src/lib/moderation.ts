import { Filter } from 'bad-words'

const filter = new Filter()

export interface ModerationResult {
  isClean: boolean
  filteredText: string
}

export function moderateContent(text: string): ModerationResult {
  const isClean = !filter.isProfane(text)
  const filteredText = filter.clean(text)
  
  return {
    isClean,
    filteredText
  }
}
