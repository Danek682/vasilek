"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

const KEY = "vasilek-cart-v1";
const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "restore":
      return action.items;
    case "add": {
      const found = state.find((i) => i.id === action.item.id);
      if (found) {
        return state.map((i) => (i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case "dec":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [ready, setReady] = useState(false);

  /* Восстановление корзины после перезагрузки страницы */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) dispatch({ type: "restore", items: JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  /* Блокировка прокрутки, пока открыта панель или модалка */
  useEffect(() => {
    document.body.dataset.lock = String(drawerOpen || orderOpen);
  }, [drawerOpen, orderOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (orderOpen) setOrderOpen(false);
      else if (drawerOpen) setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, orderOpen]);

  const value = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * i.price, 0);
    return {
      items,
      count,
      total,
      ready,
      qtyOf: (id) => items.find((i) => i.id === id)?.qty ?? 0,
      add: (item) => dispatch({ type: "add", item }),
      dec: (id) => dispatch({ type: "dec", id }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      orderOpen,
      openOrder: () => {
        setDrawerOpen(false);
        setOrderOpen(true);
      },
      closeOrder: () => setOrderOpen(false),
    };
  }, [items, drawerOpen, orderOpen, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart вызван вне CartProvider");
  return ctx;
}
