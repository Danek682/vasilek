"use client";

import Image from "next/image";
import { useCart } from "../cart/CartProvider";
import { rub } from "@/lib/format";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, tag }) {
  const { qtyOf, add, dec } = useCart();
  const qty = qtyOf(product.id);
  const shape = styles[`s${product.shape || 3}`] || styles.s3;

  return (
    <article className={styles.item}>
      <div className={styles.thumbWrap}>
        {product.image ? (
          <Image
            className={styles.photo}
            src={product.image}
            alt={product.alt || product.title}
            width={600}
            height={750}
          />
        ) : (
          <div
            className={`${styles.thumb} ${shape}`}
            style={{ "--h": product.hue ?? 320 }}
            role="img"
            aria-label={`${product.title}: фото готовится`}
          />
        )}
        {tag && <span className={styles.tag}>{tag}</span>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>{rub(product.price)}</p>
      </div>

      <div className={styles.act}>
        {qty === 0 ? (
          <button className={styles.add} type="button" onClick={() => add(product)}>
            В корзину
          </button>
        ) : (
          <div className={styles.stepper}>
            <button className={styles.step} type="button" onClick={() => dec(product.id)} aria-label="Убрать один">−</button>
            <span className={styles.qty}>{qty} шт</span>
            <button className={styles.step} type="button" onClick={() => add(product)} aria-label="Добавить ещё один">+</button>
          </div>
        )}
      </div>
    </article>
  );
}
