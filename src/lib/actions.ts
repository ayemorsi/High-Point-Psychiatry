"use server"

// Demo stub: nothing is sent. Replace the body with your email or helpdesk provider's API call.

const DEMO_DELAY = 600

export async function sendMessage(message: {
  name: string
  email: string
  phone?: string
  body: string
}) {
  await new Promise((resolve) => setTimeout(resolve, DEMO_DELAY))
  return { ok: Boolean(message.email && message.body) }
}
