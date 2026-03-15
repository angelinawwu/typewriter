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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query as { id: string }

  if (!id) {
    return res.status(400).json({ error: 'ID is required' })
  }

  try {
    const auth = getAuthClient()
    const sheets = google.sheets({ version: 'v4', auth })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:E`,
    })

    const rows = (response.data.values || []) as string[][]
    const row = rows.find((r) => r[0] === id && r[4] !== 'true')

    if (!row) {
      return res.status(404).json({ error: 'Writing not found' })
    }

    return res.status(200).json({
      id: row[0],
      author_name: row[1] || '',
      content: row[2] || '',
      created_at: row[3] || '',
      is_flagged: row[4] === 'true',
    })
  } catch (err) {
    console.error('API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
