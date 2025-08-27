// Crie o arquivo
import axios from 'axios';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabaseClient';

const api = axios.create({
    baseURL: `${SUPABASE_URL}/rest/v1/`,// depois do "v1/ vem o nome da tabela
    headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  },
});

// GET: Buscar dados
export const getAll = async (table, params = '*') => {
  const response = await api.get(`${table}?select=${params}`);
  return response.data;
};

// POST: Inserir dados
export const insert = async (table, data) => {
  const response = await api.post(table, data);
  return response.data;
};

// PUT/PATCH: Atualizar dados
export const update = async (table, id, data) => {
  const response = await api.patch(`${table}?id=eq.${id}`, data);
  return response.data;
};

// DELETE: Remover dados
export const remove = async (table, id) => {
  const response = await api.delete(`${table}?id=eq.${id}`);
  return response.data;
};

export default api;








// Buscar dados

import { useEffect, useState } from 'react';
import { getAll } from '@/services/supabaseApi';

const MyComponent = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    getAll('favorites_massas').then(setDados);
  }, []);

  // ... renderização
};











// Exemplo de inserção
import { insert } from '@/services/supabaseApi';

const novoItem = {
  name: 'Novo Massa',
  imagepath: 'https://...',
  description: 'Descrição...',
};

insert('favorites_massas', [novoItem]);








// Atualizar dados
import { update } from '@/services/supabaseApi';

update('favorites_massas', 1, { name: 'Massa Atualizada' });




// Remover dados
import { remove } from '@/services/supabaseApi';
remove('favorites_massas', 1);