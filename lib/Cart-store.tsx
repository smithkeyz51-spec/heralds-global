'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import React, { createContext } from 'react'

export type CartItemType = 'PROPERTY' | 'CAR' | 'SERVICE'

export interface CartItem {
  id: string
  type: CartItemType
  title: string
  price: number
  priceUnit?: string
  barcode: string
  brand: 'agency' | 'meridian' | 'autos'
  quantity: number
  slug: string
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id)
        if (existing) {
          set((s) => ({ items: s.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) }))
        } else {
          set((s) => ({ items: [...s.items, { ...item, quantity: 1 }] }))
        }
      },
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) => set((s) => ({
        items: qty <= 0 ? s.items.filter((i) => i.id !== id) : s.items.map((i) => i.id === id ? { ...i, quantity: qty } : i),
      })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'heralds-cart' }
  )
)

const CartContext = createContext<null>(null)
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <CartContext.Provider value={null}>{children}</CartContext.Provider>
}
