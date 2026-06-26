/** Shared admin types — kept free of 'use server'/'server-only' so both server
 *  pages and client components can import them. (Type-only imports are erased.) */
import type { ManagedBrand } from './queries'

export interface ActionResult {
  ok: boolean
  error?: string
  message?: string
}

export interface AdminBrand extends ManagedBrand {
  owner_user_id: string | null
  is_active: boolean
}
