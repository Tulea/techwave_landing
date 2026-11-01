import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const REDIRECT_DELAY_MS = 10000

export function useRedirectAfter(active, to) {
  const navigate = useNavigate()
  useEffect(() => {
    if (!active) return
    const timer = setTimeout(() => navigate(to, { replace: true }), REDIRECT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [active, to, navigate])
}
