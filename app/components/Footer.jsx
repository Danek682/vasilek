import Image from "next/image";
import Link from "next/link";
import { SHOP, WEEK } from "@/lib/shop";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={styles.in}>
        <div className={styles.brand}>
          <Image className={styles.logo} src="/logo.jpg" alt="Vasilek" width={128} height={128} />
          <b>Vasilek</b>
          <p>Первые в Омске основатели шикарных букетов-гигантов. Собираем и доставляем с 09:00 до 21:00.</p>
        </div>

        <div className={styles.col}>
          <h4>Связаться</h4>
          <a className={styles.tel} href={SHOP.phoneHref}>{SHOP.phone}</a>
          <a href={SHOP.mapLink} target="_blank" rel="noopener noreferrer">{SHOP.addressFull}</a>
          <span>Доставка по городу {SHOP.deliveryPrice} ₽</span>
          <span>Фото букета перед отправкой</span>
        </div>

        <div className={styles.col}>
          <h4>Режим работы</h4>
          <div className={styles.days}>
            {WEEK.map((d) => (
              <span className={styles.day} key={d.short}>
                <span>{d.short}</span>
                <span>{d.hours}</span>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <h4>Разделы</h4>
          <Link href="/catalog">Каталог букетов</Link>
          <Link href="/delivery">Оплата, доставка, возврат</Link>
          <Link href="/privacy">Политика конфиденциальности</Link>
          <Link href="/#contacts">Как нас найти</Link>
        </div>

        <div className={styles.legal}>
          <span>© {new Date().getFullYear()} Vasilek · букеты-гиганты, Омск</span>
          <span>Информация на сайте не является публичной офертой</span>
        </div>
      </div>
    </footer>
  );
}
