import { redirect } from 'next/navigation'

/**
 * /method has been removed. Anything still linking here (search results,
 * old shares) lands back on the homepage.
 */
export default function MethodPage() {
  redirect('/')
}
