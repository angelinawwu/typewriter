import type { VercelRequest, VercelResponse } from '@vercel/node'
import { google } from 'googleapis'

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!
const SHEET_NAME = 'writings'

function getAuthClient() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

interface Writing {
  id: string
  author_name: string
  content: string
  created_at: string
  is_flagged: boolean
}

function rowToWriting(row: string[]): Writing {
  return {
    id: row[0] || '',
    author_name: row[1] || '',
    content: row[2] || '',
    created_at: row[3] || '',
    is_flagged: row[4] === 'true',
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const auth = getAuthClient()
    const sheets = google.sheets({ version: 'v4', auth })

    if (req.method === 'GET') {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A2:E`,
      })

      const rows = (response.data.values || []) as string[][]
      const writings = rows
        .map(rowToWriting)
        .filter((w) => w.id && !w.is_flagged)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      return res.status(200).json(writings)
    }

    if (req.method === 'POST') {
      const { author_name, content } = req.body as { author_name?: string; content?: string }

      if (!content?.trim()) {
        return res.status(400).json({ error: 'Content is required' })
      }

      const id = crypto.randomUUID()
      const created_at = new Date().toISOString()

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:E`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[id, author_name?.trim() || '', content.trim(), created_at, 'false']],
        },
      })

      const writing: Writing = {
        id,
        author_name: author_name?.trim() || '',
        content: content.trim(),
        created_at,
        is_flagged: false,
      }
      return res.status(201).json(writing)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
