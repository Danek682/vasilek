import Image from "next/image";
import Link from "next/link";
import { SHOP } from "@/lib/shop";
import ui from "../styles/ui.module.css";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.in}>
        <div className={styles.copy}>
          <p className={styles.badge}><b>Первые в Омске</b> основатели букетов-гигантов</p>
          <h1 className={styles.title}>
            Букеты-гиганты, <em>которые</em> невозможно не заметить
          </h1>
          <p className={styles.sub}>Удиви своих любимых оригинальным букетом. Собираем в день заказа и присылаем фото перед отправкой.</p>
          <div className={styles.acts}>
            <Link className={`${ui.btn} ${ui.btnAccent}`} href="/catalog">Смотреть каталог</Link>
            <a className={`${ui.btn} ${ui.btnGhost}`} href={SHOP.phoneHref}>Заказать по телефону</a>
          </div>
          <div className={styles.phone}>
            <a href={SHOP.phoneHref}>{SHOP.phone}</a>
            <span>Ежедневно {SHOP.hours} · {SHOP.addressFull}</span>
          </div>
        </div>

        <div className={styles.shot}>
          <div className={styles.disc}>
            <Image
              className={styles.discImg}
              src="/logo.jpg"
              alt="Vasilek: букет-гигант из гортензий, роз и хризантем"
              width={880}
              height={880}
              priority
            />
          </div>
          <span className={styles.ring} aria-hidden="true" />
        </div>

        <ul className={styles.facts}>
          <li className={styles.fact}><b>Фото</b> букета перед отправкой</li>
          <li className={styles.fact}><b>{SHOP.deliveryPrice} ₽</b> доставка по городу</li>
          <li className={styles.fact}><b>{SHOP.address}</b> самовывоз бесплатно</li>
          <li className={styles.fact}><b>от 1 750 ₽</b> шары и небольшие букеты</li>
        </ul>
      </div>
    </section>
  );
}
