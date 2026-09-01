"use client";

import Image from "next/image";
import { useCart } from "../cart/CartProvider";
import { rub, plural } from "@/lib/format";
import { SHOP } from "@/lib/shop";
import ui from "../styles/ui.module.css";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { items, count, total, drawerOpen, closeDrawer, add, dec, remove, clear, openOrder } = useCart();

  return (
    <>
      <div
        className={drawerOpen ? `${styles.veil} ${styles.veilOn}` : styles.veil}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        className={drawerOpen ? `${styles.panel} ${styles.panelOn}` : styles.panel}
        aria-label="Корзина"
        aria-hidden={!drawerOpen}
      >
        <div className={styles.head}>
          <div>
            <h2>Корзина</h2>
            <p>
              {count > 0
                ? `${count} ${plural(count, "букет", "букета", "букетов")} в заказе`
                : "Пока ничего не выбрано"}
            </p>
          </div>
          <button className={styles.close} type="button" onClick={closeDrawer} aria-label="Закрыть корзину">✕</button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyMark} aria-hidden="true" />
            <b>Здесь появятся букеты</b>
            <p>Выберите готовый вариант в каталоге или позвоните, соберём под ваш бюджет и повод.</p>
            <a className={`${ui.btn} ${ui.btnGhost} ${ui.btnSm}`} href={SHOP.phoneHref}>{SHOP.phone}</a>
          </div>
        ) : (
          <>
            <div className={styles.list}>
              {items.map((i) => (
                <div className={styles.line} key={i.id}>
                  {i.image ? (
                    <Image className={styles.photo} src={i.image} alt={i.title} width={116} height={144} />
                  ) : (
                    <div className={styles.thumb} style={{ "--h": i.hue ?? 320 }} aria-hidden="true" />
                  )}
                  <div className={styles.info}>
                    <b>{i.title}</b>
                    <span>{rub(i.price * i.qty)}</span>
                  </div>
                  <div className={styles.lineActs}>
                    <div className={styles.stepper}>
                      <button className={styles.step} type="button" onClick={() => dec(i.id)} aria-label="Меньше">−</button>
                      <span className={styles.qty}>{i.qty}</span>
                      <button className={styles.step} type="button" onClick={() => add(i)} aria-label="Больше">+</button>
                    </div>
                    <button className={styles.drop} type="button" onClick={() => remove(i.id)}>убрать</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.foot}>
              <div className={styles.sum}>
                <span>Букеты</span>
                <b>{rub(total)}</b>
              </div>
              <p className={styles.note}>
                Доставка по Омску {SHOP.deliveryPrice} ₽ оплачивается отдельно. Самовывоз с {SHOP.address} бесплатно.
              </p>
              <button className={`${ui.btn} ${ui.btnAccent} ${ui.btnWide}`} type="button" onClick={openOrder}>
                Оформить заказ
              </button>
              <button className={styles.clear} type="button" onClick={clear}>очистить корзину</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
