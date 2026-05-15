// Community page is currently hidden. The /community URL is redirected to / via next.config.
// This stub exists only so Next.js can satisfy the route shape without referencing removed data.

import { redirect } from 'next/navigation'

export default function CommunityPage() {
  redirect('/')
}
