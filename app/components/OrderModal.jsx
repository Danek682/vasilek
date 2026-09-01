"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../cart/CartProvider";
import { rub, plural } from "@/lib/format";
import { SHOP } from "@/lib/shop";
import ui from "../styles/ui.module.css";
import styles from "./OrderModal.module.css";

const EMPTY = {
  name: "",
  phone: "",
  way: "delivery",
  address: "",
  date: "",
  time: "",
  comment: "",
  consent: false,
};

export default function OrderModal() {
  const { items, count, total, orderOpen, closeOrder, clear } = useCart();
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const reset = () => {
    setForm(EMPTY);
    setState("idle");
    setError("");
  };

  const dismiss = () => {
    closeOrder();
    if (state === "done") reset();
  };

  async function submit(e) {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({ title: i.title, price: i.price, qty: i.qty })),
          total,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.message || "Заявка не ушла");
      setState("done");
      clear();
    } catch (err) {
      setState("error");
      setError(
        err.message === "Failed to fetch"
          ? "Нет связи с сервером. Позвоните нам, оформим заказ по телефону."
          : err.message
      );
    }
  }

  const delivery = form.way === "delivery";

  return (
    <div
      className={orderOpen ? `${styles.veil} ${styles.veilOn}` : styles.veil}
      onClick={(e) => e.target === e.currentTarget && dismiss()}
      aria-hidden={!orderOpen}
    >
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Оформление заказа">
        {state === "done" ? (
          <div className={styles.done}>
            <div className={styles.doneMark} aria-hidden="true">✓</div>
            <h2>Заявка принята</h2>
            <p>
              Менеджер позвонит на {form.phone || "указанный номер"} в рабочее время и подтвердит состав,
              дату и время. Букет сфотографируем перед отправкой.
            </p>
            <button className={`${ui.btn} ${ui.btnPrimary}`} type="button" onClick={dismiss}>
              Хорошо
            </button>
          </div>
        ) : (
          <>
            <div className={styles.head}>
              <div>
                <h2>Оформление заказа</h2>
                <p>Заполните два поля, остальное уточним по телефону</p>
              </div>
              <button className={styles.close} type="button" onClick={dismiss} aria-label="Закрыть">✕</button>
            </div>

            {count > 0 && (
              <div className={styles.recap}>
                <span>
                  {count} {plural(count, "букет", "букета", "букетов")} в заявке
                </span>
                <b>{rub(total)}</b>
                <div className={styles.recapList}>
                  {items.map((i) => (
                    <span className={styles.recapLine} key={i.id}>
                      <span>{i.title} × {i.qty}</span>
                      <span>{rub(i.price * i.qty)}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <form className={styles.form} onSubmit={submit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="o-name">Имя <i>*</i></label>
                  <input id="o-name" type="text" placeholder="Как к вам обращаться" minLength={2}
                         value={form.name} onChange={set("name")} required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="o-phone">Телефон <i>*</i></label>
                  <input id="o-phone" type="tel" placeholder="+7 900 000-00-00" pattern="[0-9+()\s-]{10,20}"
                         value={form.phone} onChange={set("phone")} required />
                </div>
              </div>

              <div className={styles.ways}>
                <p className={styles.waysTitle}>Способ получения</p>
                <div className={styles.waysRow}>
                  <label className={delivery ? `${styles.way} ${styles.wayOn}` : styles.way}>
                    <input type="radio" name="way" value="delivery" checked={delivery} onChange={set("way")} />
                    <span className={styles.wayText}>
                      <b>Доставка</b>
                      <span>по городу {SHOP.deliveryPrice} ₽</span>
                    </span>
                  </label>
                  <label className={!delivery ? `${styles.way} ${styles.wayOn}` : styles.way}>
                    <input type="radio" name="way" value="pickup" checked={!delivery} onChange={set("way")} />
                    <span className={styles.wayText}>
                      <b>Самовывоз</b>
                      <span>{SHOP.address}</span>
                    </span>
                  </label>
                </div>
              </div>

              {delivery && (
                <div className={styles.field}>
                  <label htmlFor="o-address">Адрес доставки</label>
                  <input id="o-address" type="text" placeholder="Улица, дом, квартира, подъезд"
                         value={form.address} onChange={set("address")} />
                </div>
              )}

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="o-date">{delivery ? "Дата доставки" : "Дата получения"}</label>
                  <input id="o-date" type="date" value={form.date} onChange={set("date")} />
                </div>
                <div className={styles.field}>
                  <label htmlFor="o-time">Желаемое время</label>
                  <input id="o-time" type="time" min="09:00" max="21:00" value={form.time} onChange={set("time")} />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="o-comment">Комментарий</label>
                <textarea id="o-comment" placeholder="Повод, слова для открытки, пожелания по цветам"
                          value={form.comment} onChange={set("comment")} />
              </div>

              <label className={styles.consent}>
                <input type="checkbox" checked={form.consent} onChange={set("consent")} required />
                <span>
                  Согласен на обработку персональных данных согласно{" "}
                  <Link className={ui.u} href="/privacy" onClick={dismiss}>политике конфиденциальности</Link>
                </span>
              </label>

              {state === "error" && <p className={styles.error}>{error}</p>}

              <button className={`${ui.btn} ${ui.btnAccent} ${ui.btnWide}`} type="submit" disabled={state === "sending"}>
                {state === "sending" ? "Отправляем…" : "Оформить заказ"}
              </button>

              <p className={styles.note}>
                Заявка уходит менеджеру на почту. Оплата после подтверждения состава и времени,
                фото букета присылаем перед отправкой.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
