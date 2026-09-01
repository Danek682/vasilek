import ContactsHours from "./ContactsHours";
import { SHOP } from "@/lib/shop";
import ui from "../styles/ui.module.css";
import styles from "./Contacts.module.css";

export default function Contacts() {
  return (
    <section className={styles.band} id="contacts">
      <div className={styles.in}>
        <div className={styles.hours} id="hours">
          <div>
            <p className={ui.eyebrow}>Режим работы</p>
          </div>
          <div className={styles.everyday}>
            <b>{SHOP.hours}</b>
            <span>ежедневно, без выходных</span>
          </div>
          <ContactsHours />
        </div>

        <div className={styles.addr}>
          <div className={styles.addrRow}>
            <p>Телефон</p>
            <a className={styles.big} href={SHOP.phoneHref}>{SHOP.phone}</a>
          </div>
          <div className={styles.addrRow}>
            <p>Мастерская</p>
            <a className={styles.big} href={SHOP.mapLink} target="_blank" rel="noopener noreferrer">
              {SHOP.address}
            </a>
          </div>
          <div className={styles.addrRow}>
            <p>Доставка</p>
            <p className={ui.hint}>По Омску {SHOP.deliveryPrice} ₽, вместе со словами поздравления и отчётом о доставке.</p>
          </div>
        </div>

        <div className={styles.map}>
          <iframe
            className={styles.frame}
            src={SHOP.mapWidget}
            title={`Карта: ${SHOP.addressFull}`}
            loading="lazy"
            allowFullScreen
          />
          <div className={styles.mapBar}>
            <b>{SHOP.addressFull}</b>
            <a className={ui.u} href={SHOP.mapLink} target="_blank" rel="noopener noreferrer">
              Открыть в Яндекс.Картах
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
