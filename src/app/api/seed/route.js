import { supabase } from '@/lib/supabaseClient'
import categories from '@/data/categories'
import favorites from '@/data/favorites-massas'
import promotions from '@/data/promotion'
import { toDbLowercaseArray } from '@/lib/transform'

const MAP = [
  { name: 'categories', data: categories },
  { name: 'favorites_massas', data: favorites },
  { name: 'promotions', data: promotions }
]

export async function GET() {
  const results = []

  for (const item of MAP) {
    try {
      if (!item.data || item.data.length === 0) {
        results.push({ table: item.name, inserted: 0, ok: true, note: 'sem dados' })
        continue
      }

      const payload = toDbLowercaseArray(item.data)

      console.log(`Seeding ${item.name}: primeiro objeto =>`, payload[0])

      const { data, error } = await supabase.from(item.name).insert(payload)

      if (error) {
        const perRow = []
        for (const row of payload) {
          const r = await supabase.from(item.name).insert(row)
          perRow.push({ row, result: r })
        }
        results.push({ table: item.name, ok: false, error: error.message, detail: perRow })
      } else {
        results.push({ table: item.name, ok: true, inserted: Array.isArray(data) ? data.length : 1 })
      }
    } catch (e) {
      results.push({ table: item.name, ok: false, error: String(e) })
    }
  }

  return new Response(JSON.stringify({ results }, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
