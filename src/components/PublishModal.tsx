import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { moderateContent } from '../lib/moderation'

interface PublishModalProps {
  isOpen: boolean
  onClose: () => void
  content: string
  onSuccess: () => void
}

const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, content, onSuccess }) => {
  const [authorName, setAuthorName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!supabase) {
      setError('Publishing is currently unavailable. Please configure Supabase.')
      return
    }
    
    // Name is optional; if provided, moderate it
    if (authorName.trim()) {
      const nameModeration = moderateContent(authorName)
      if (!nameModeration.isClean) {
        setError('Please enter an appropriate name or leave it blank.')
        return
      }
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Check content moderation
      const moderation = moderateContent(content)
      if (!moderation.isClean) {
        setError('Content contains inappropriate language. Please revise your text.')
        setIsSubmitting(false)
        return
      }

      // Submit to Supabase
      const { error: insertError } = await supabase
        .from('writings')
        .insert([
          {
            author_name: authorName.trim(),
            content: content.trim(),
            is_flagged: false
          }
        ])

      if (insertError) {
        throw insertError
      }

      onSuccess()
      setAuthorName('')
    } catch (err) {
      console.error('Error publishing:', err)
      setError('Failed to publish. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Publish Your Writing</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="authorName">
              Nickname: <span className="optional-label">(optional)</span>
            </label>
            <input
              id="authorName"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Enter your nickname"
              maxLength={50}
              
            />
          </div>

          <div className="form-group">
            <label>Preview:</label>
            <div className="content-preview">
              {content || 'No content to preview'}
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button className="publish-btn" type="submit" disabled={isSubmitting || !content.trim()}>
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PublishModal
