'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

/**
 * A single line in the cart. `variantId` is the unique key — a product can
 * appear once per variant. Money is integer cents, matching the catalog.
 */
export interface CartItem {
  variantId: string
  productId: string
  name: string
  priceCents: number
  brandId: string
  brandName: string
  image: string | null
  qty: number
  variantLabel?: string | null
}

interface CartValue {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  remove: (variantId: string) => void
  setQty: (variantId: string, qty: number) => void
  clear: () => void
  clearBrand: (brandId: string) => void
  totalCents: number
  count: number
  hydrated: boolean
}

const STORAGE_KEY = 'phyzik.shop.cart.v1'
const MAX_QTY = 99

const CartContext = createContext<CartValue | null>(null)

function readStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Defensive: only keep well-formed rows.
    return parsed.filter(
      (r): r is CartItem =>
        r &&
        typeof r.variantId === 'string' &&
        typeof r.priceCents === 'number' &&
        typeof r.qty === 'number',
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)
  // Avoid writing back the initial empty state before hydration completes.
  const didHydrate = useRef(false)

  useEffect(() => {
    setItems(readStorage())
    setHydrated(true)
    didHydrate.current = true
  }, [])

  useEffect(() => {
    if (!didHydrate.current || typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage full or unavailable — cart still works for the session */
    }
  }, [items])

  // Keep multiple tabs in sync.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(readStorage())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const add = useCallback((item: Omit<CartItem, 'qty'>, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === item.variantId)
      if (existing) {
        return prev.map((i) =>
          i.variantId === item.variantId
            ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) }
            : i,
        )
      }
      return [...prev, { ...item, qty: Math.min(MAX_QTY, Math.max(1, qty)) }]
    })
  }, [])

  const remove = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId))
  }, [])

  const setQty = useCallback((variantId: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.variantId !== variantId)
      return prev.map((i) =>
        i.variantId === variantId
          ? { ...i, qty: Math.min(MAX_QTY, Math.round(qty)) }
          : i,
      )
    })
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const clearBrand = useCallback((brandId: string) => {
    setItems((prev) => prev.filter((i) => i.brandId !== brandId))
  }, [])

  const totalCents = useMemo(
    () => items.reduce((sum, i) => sum + i.priceCents * i.qty, 0),
    [items],
  )

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  const value = useMemo<CartValue>(
    () => ({
      items,
      add,
      remove,
      setQty,
      clear,
      clearBrand,
      totalCents,
      count,
      hydrated,
    }),
    [items, add, remove, setQty, clear, clearBrand, totalCents, count, hydrated],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
