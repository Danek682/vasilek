"use client";

import { useEffect, useState } from "react";
import { WEEK } from "@/lib/shop";
import styles from "./Contacts.module.css";

/* Подсветка текущего дня. Считаем после монтирования,
   чтобы серверная и клиентская разметка совпали. */
export default function ContactsHours() {
  const [today, setToday] = useState(-1);

  useEffect(() => {
    const js = new Date().getDay(); // 0 = воскресенье
    setToday(js === 0 ? 6 : js - 1);
  }, []);

  return (
    <div className={styles.week}>
      {WEEK.map((d, i) => (
        <div
          className={i === today ? `${styles.day} ${styles.dayToday}` : styles.day}
          key={d.short}
          title={d.full}
        >
          <b>{d.short}</b>
          <span>{d.hours}</span>
        </div>
      ))}
    </div>
  );
}
