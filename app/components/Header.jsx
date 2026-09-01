"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/CartProvider";
import { SHOP } from "@/lib/shop";
import { rub } from "@/lib/format";
import styles from "./Header.module.css";

const LINKS = [
  { href: "/catalog", label: "Каталог", note: "50+ букетов" },
  { href: "/#hours", label: "Режим работы", note: "ежедневно" },
  { href: "https://vk.ru/vasilekomsk", label: "VK", note: "vk.ru/vasilekomsk" },
  { href: "https://www.instagram.com/vasilekomsk_/", label: "Instagram", note: "instagram.com/vasilekomsk_" },
  { href: "/delivery", label: "Доставка и оплата", note: `${SHOP.deliveryPrice} ₽` },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count, total, openDrawer } = useCart();
  const close = () => setOpen(false);

  return (
    <>
      <header className={styles.top}>
        <Link className={styles.brand} href="/" onClick={close}>
          <Image className={styles.logo} src="/logo.jpg" alt="Vasilek" width={104} height={104} priority />
          <span className={styles.brandText}>
            <b>Vasilek</b>
            <span>{SHOP.tagline} · {SHOP.city}</span>
          </span>
        </Link>

        <nav className={styles.nav}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>

        <a className={styles.tel} href={SHOP.phoneHref}>
          <b>{SHOP.phone}</b>
          <span>ежедневно {SHOP.hours}</span>
        </a>

        <button className={styles.cart} type="button" onClick={openDrawer} aria-label="Открыть корзину">
          <span className={styles.cartLabel}>Корзина</span>
          {count > 0 && <span className={styles.cartSum}>{rub(total)}</span>}
          <span className={count > 0 ? styles.badge : `${styles.badge} ${styles.badgeEmpty}`}>{count}</span>
        </button>

        <button
          className={open ? `${styles.burger} ${styles.burgerOpen}` : styles.burger}
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          <i /><i />
        </button>
      </header>

      <div className={open ? `${styles.drawer} ${styles.drawerOpen}` : styles.drawer} id="menu">
        <nav className={styles.drawerNav}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={close}>
              {l.label}<span>{l.note}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.drawerFoot}>
          <a className={styles.drawerTel} href={SHOP.phoneHref}>{SHOP.phone}</a>
          <p className={styles.drawerMeta}>{SHOP.addressFull}</p>
          <p className={styles.drawerMeta}>Ежедневно {SHOP.hours}</p>
        </div>
      </div>
    </>
  );
}
