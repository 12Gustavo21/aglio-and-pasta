import api from '@/lib/apiClient'

export default async function FavoritesServerList() {
  const res = await api.get('/favorites_massas')
  const items = res.data

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map(i => (
        <div key={i.id} className="p-3 border rounded">
          <img src={i.imagepath || '/placeholder.png'} alt={i.name} className="w-full h-36 object-cover rounded" />
          <h5 className="mt-2 font-semibold">{i.name}</h5>
        </div>
      ))}
    </div>
  )
}
