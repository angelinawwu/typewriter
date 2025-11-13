import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase, type Writing } from '../lib/supabase'
import { ArrowLeft } from '@phosphor-icons/react'
// Detect mobile for image optimization
const isMobileDevice = window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
import paperDesktop from '../assets/paper1.webp';
import paperMobile from '../assets/paper1-mobile.webp';
const paper = isMobileDevice ? paperMobile : paperDesktop;

const SharedWriting: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [writing, setWriting] = useState<Writing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      fetchWriting(id)
    }
  }, [id])

  const fetchWriting = async (writingId: string) => {
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
        .eq('id', writingId)
        .eq('is_flagged', false)
        .single()

      if (error) throw error
      setWriting(data)
    } catch (err) {
      console.error('Error fetching writing:', err)
      setError('Writing not found or has been removed')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="shared-writing-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (error || !writing) {
    return (
      <div className="shared-writing-container">
        <div className="error">
          <h2>Writing Not Found</h2>
          <p>{error || 'This writing may have been removed or the link is invalid.'}</p>
          <Link to="/" className="return-home-link"><ArrowLeft size={16} className="icon-arrow-left" /> Back to Typewriter</Link>
        </div>
      </div>
    )   
  }

  return (
    <div className="shared-writing-container">
      <Link to="/" className="return-home-link"><ArrowLeft size={16} className="icon-arrow-left" /> Back to Typewriter</Link>
      <div className="writing-header">
        <h1>{writing.author_name}</h1>
        <p className="writing-date">{formatDate(writing.created_at)}</p>
      </div>
      
      <div className="writing-content">
        <div className="paper-background">
          <img src={paper} alt="paper" className="paper-background__img" />
          <div className="paper-background__text">
            {writing.content}
          </div>
        </div>
      </div>

      {/* <div className="writing-footer">
        <Link to="/" className="back-link"><ArrowLeft size={16} className="icon-arrow-left" /> Write Something New</Link>
        <a href="/gallery" className="gallery-link">View All Writings →</a>
      </div> */}
    </div>
  )
}

export default SharedWriting
