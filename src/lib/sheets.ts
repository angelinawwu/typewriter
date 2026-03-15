export type Writing = {
  id: string
  author_name: string
  content: string
  created_at: string
  is_flagged: boolean
}

export async function fetchWritings(): Promise<Writing[]> {
  const res = await fetch('/api/writings')
  if (!res.ok) throw new Error('Failed to fetch writings')
  return res.json()
}

export async function fetchWritingById(id: string): Promise<Writing> {
  const res = await fetch(`/api/writings/${id}`)
  if (!res.ok) throw new Error('Writing not found')
  return res.json()
}

export async function createWriting(author_name: string, content: string): Promise<Writing> {
  const res = await fetch('/api/writings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author_name, content }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || 'Failed to publish writing')
  }
  return res.json()
}
