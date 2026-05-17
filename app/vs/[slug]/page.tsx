import { redirect } from 'next/navigation'

// Individual /vs/[slug] pages were collapsed into a single unified chart at /vs.
// Old links redirect there.
export default async function VsSlugPage() {
  redirect('/vs')
}
