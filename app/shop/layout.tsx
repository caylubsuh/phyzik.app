import { CartProvider } from '@/components/shop/CartContext'
import CartIndicator from '@/components/shop/CartIndicator'

/**
 * Shop section layout. Wraps every /shop route in the cart provider so the
 * cart persists across the storefront, and mounts a floating cart indicator.
 */
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartIndicator />
    </CartProvider>
  )
}
