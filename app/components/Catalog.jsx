"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { plural } from "@/lib/format";
import styles from "./Catalog.module.css";

export default function Catalog({ categories, products }) {
  const [active, setActive] = useState("all");

  const groups = useMemo(
    () =>
      categories
        .map((c) => ({ ...c, items: products.filter((p) => p.category === c.id) }))
        .filter((g) => g.items.length > 0),
    [categories, products]
  );

  const shown = active === "all" ? groups : groups.filter((g) => g.id === active);

  return (
    <div className={styles.wrap}>
      <div className={styles.filters} role="tablist" aria-label="Категории каталога">
        <button
          type="button"
          role="tab"
          aria-selected={active === "all"}
          className={active === "all" ? `${styles.chip} ${styles.chipOn}` : styles.chip}
          onClick={() => setActive("all")}
        >
          Все букеты<span className={styles.chipCount}>{products.length}</span>
        </button>
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={active === g.id}
            className={active === g.id ? `${styles.chip} ${styles.chipOn}` : styles.chip}
            onClick={() => setActive(g.id)}
          >
            {g.title}<span className={styles.chipCount}>{g.items.length}</span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className={styles.empty}>
          <b>Здесь пока пусто</b>
          <p>Букеты этой категории ещё не выложили. Позвоните нам, соберём под ваш бюджет за пару часов.</p>
        </div>
      ) : (
        shown.map((g) => (
          <section className={styles.group} key={g.id} id={g.id}>
            <div className={styles.groupHead}>
              <div className={styles.groupTitle}>
                <h3>{g.title}</h3>
                {g.note && <span>{g.note}</span>}
              </div>
              <p className={styles.groupMeta}>
                {g.items.length} {plural(g.items.length, "вариант", "варианта", "вариантов")}
              </p>
            </div>
            <div className={styles.grid}>
              {g.items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
