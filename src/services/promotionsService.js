import api from '@/lib/apiClient'

const resource = '/promotions'

export async function getPromotions(limit) {
  const res = await api.get(resource, { params: { limit } })
  return res.data
}

export async function getPromotionById(id) {
  const res = await api.get(`${resource}/${id}`)
  return res.data
}

export async function createPromotion(payload) {
  const res = await api.post(resource, payload)
  return res.data
}

export async function updatePromotion(id, payload) {
  const res = await api.put(`${resource}/${id}`, payload)
  return res.data
}

export async function deletePromotion(id) {
  const res = await api.delete(`${resource}/${id}`)
  return res.data
}
