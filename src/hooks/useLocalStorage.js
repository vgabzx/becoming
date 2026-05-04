import { useState, useEffect } from 'react'

/**
 * Hook que sincroniza um estado React com o localStorage do navegador.
 * Funciona igual ao useState, mas persiste entre sessões.
 *
 * @param {string} key - Chave usada no localStorage (ex: 'becoming.identities')
 * @param {*} initialValue - Valor padrão se não houver nada salvo
 */
export function useLocalStorage(key, initialValue) {
  // Inicializa lendo do localStorage. Se não existir, usa initialValue.
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (error) {
      console.error(`Erro ao ler ${key} do localStorage:`, error)
      return initialValue
    }
  })

  // Sempre que o valor mudar, escreve no localStorage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error)
    }
  }, [key, value])

  return [value, setValue]
}