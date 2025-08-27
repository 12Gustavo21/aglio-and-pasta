'use client'
import { useState, useEffect } from 'react'
import { getFavorites, deleteFavorite } from '@/services/favoritesService'

export default function FavoritesList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchAll() {
    setLoading(true)
    try {
      const data = await getFavorites()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteFavorite(id)
      setItems(items.filter(i => i.id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { fetchAll() }, [])

  return (
    <div>
      {loading && <p>Carregando...</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(i => (
          <div key={i.id} className="p-3 border rounded">
            <img src={i.imagepath || '/placeholder.png'} alt={i.name} className="w-full h-36 object-cover rounded" />
            <h5 className="mt-2 font-semibold">{i.name}</h5>
            <button
              onClick={() => handleDelete(i.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
