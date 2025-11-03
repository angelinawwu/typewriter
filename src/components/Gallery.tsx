import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase, type Writing } from '../lib/supabase'
import paper from '../assets/paper1.png'
import { ArrowLeft } from '@phosphor-icons/react'

const Gallery: React.FC = () => {
  const [writings, setWritings] = useState<Writing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchWritings()
  }, [])

  const fetchWritings = async () => {
    try {
      setLoading(true)
      
      if (!supabase) {
        setError('Database not configured')
        setLoading(false)
        return
      }
      
      const { data, error } = await supabase
        .from('writings')
        .select('*')
        .eq('is_flagged', false)
        .order('created_at', { ascending: false })

      if (error) throw error
      setWritings(data || [])
    } catch (err) {
      console.error('Error fetching writings:', err)
      setError('Failed to load writings')
    } finally {
      setLoading(false)
    }
  }

  const copyShareLink = async (id: string) => {
    const shareUrl = `${window.location.origin}/writing/${id}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      // You could add a toast notification here
      alert('Share link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPreview = (content: string) => {
    return content.length > 220 ? content.substring(0, 220) + '…' : content
  }

  const totalPages = Math.ceil(writings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentWritings = writings.slice(startIndex, startIndex + itemsPerPage)

  if (loading) {
    return (
      <div className="gallery-container">
        <h1>Published Writings</h1>
        <div className="loading">Loading writings...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="gallery-container">
        <h1>Published Writings</h1>
        <div className="error">{error}</div>
        <button onClick={fetchWritings}>Try Again</button>
      </div>
    )
  }

  return (
    <div className="gallery-container">
      <Link to="/" className="return-home-link"><ArrowLeft size={16} className="icon-arrow-left" /> Return Home</Link>
      <h1>Published Writings</h1>
      
      {writings.length === 0 ? (
        <div className="empty-state">
          <p>No writings have been published yet.</p>
          <p>Be the first to share your thoughts!</p>
        </div>
      ) : (
        <>
          <div className="writings-grid">
            {currentWritings.map((writing) => (
              <div key={writing.id} className="paper-preview" onClick={() => setExpandedId(writing.id)}>
                <img src={paper} alt="paper" className="paper-preview__bg" />
                <div className="paper-preview__text">
                  {getPreview(writing.content)}
                </div>
                <div className="paper-preview__meta">
                  <span>{writing.author_name || 'Anonymous'}</span>
                  <button onClick={(e) => { e.stopPropagation(); copyShareLink(writing.id); }} className="share-btn">Share</button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
          {expandedId && (
            <div className="modal-overlay" onClick={() => setExpandedId(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {(() => {
                  const w = writings.find(w => w.id === expandedId)
                  if (!w) return null
                  return (
                    <div className="paper-full">
                      <img src={paper} alt="paper" className="paper-full__bg" />
                      <div className="paper-full__text">{w.content}</div>
                      <div className="paper-full__meta">
                        <div>{w.author_name || 'Anonymous'}</div>
                        <div className="writing-date">{formatDate(w.created_at)}</div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Gallery
