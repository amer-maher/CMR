import { getJson } from '../../shared/lib/http.js'

const API = 'https://jsonplaceholder.typicode.com'

function toCustomer(u) {
  const tier = ['Lead', 'Customer', 'VIP'][u.id % 3]
  return {
    id: String(u.id),
    name: u.name,
    email: u.email,
    phone: u.phone,
    company: u.company?.name ?? '—',
    tier,
    city: u.address?.city ?? '—',
    website: u.website ?? '—',
  }
}

export async function fetchCustomers({ signal } = {}) {
  const users = await getJson(`${API}/users`, { signal })
  return users.map(toCustomer)
}

export async function fetchCustomerById(id, { signal } = {}) {
  const user = await getJson(`${API}/users/${id}`, { signal })
  return toCustomer(user)
}

