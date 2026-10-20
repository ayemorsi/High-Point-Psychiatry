"use server"

// Demo stubs: nothing is sent. Replace each body with your email or helpdesk provider's API call.

const DEMO_DELAY = 600

export async function subscribe(email: string) {
  await new Promise((resolve) => setTimeout(resolve, DEMO_DELAY))
  return { ok: Boolean(email) }
}

export async function sendMessage(message: {
  name: string
  email: string
  order?: string
  topic?: string
  body: string
}) {
  await new Promise((resolve) => setTimeout(resolve, DEMO_DELAY))
  return { ok: Boolean(message.email && message.body) }
}

export async function requestRestockAlert(email: string, slug: string) {
  await new Promise((resolve) => setTimeout(resolve, DEMO_DELAY))
  return { ok: Boolean(email && slug) }
}
