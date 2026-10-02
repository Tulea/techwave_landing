import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import es from './data/contenido.json'
import en from './data/contenido.en.json'

export const dictionaries = { es, en }
const STORAGE_KEY = 'techwave-lang'

function readSavedLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && saved in dictionaries) return saved
  } catch {}
  return 'es'
}

const LanguageContext = createContext({ lang: 'es', content: es, toggleLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readSavedLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {}
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      content: dictionaries[lang],
      toggleLang: () => setLang((l) => (l === 'es' ? 'en' : 'es')),
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
export const useContent = () => useContext(LanguageContext).content
