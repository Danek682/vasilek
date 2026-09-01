import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { plural } from "@/lib/format";
import ui from "../styles/ui.module.css";
import styles from "./Featured.module.css";

const TAGS = {
  "g-1": "хит",
  "bx-1": "гигант",
  "r-2": "гортензии",
};

export default function Featured({ products }) {
  const picks = ["g-1", "bx-1", "r-2", "s6-1", "s4-1", "s3-2", "s2-2", "bl-2"]
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const list = picks.length ? picks : products.slice(0, 8);

  return (
    <section className={ui.sec} id="featured">
      <div className={ui.shell}>
        <div className={ui.head}>
          <div className={ui.headText}>
            <p className={ui.eyebrow}>Каталог</p>
            <h2 className={ui.h2}>Выбирают чаще всего</h2>
            <p className={ui.lead}>Коробки-гиганты, круглые букеты, шары. Всё, что на фото, можно собрать сегодня.</p>
          </div>
          <Link className={`${ui.btn} ${ui.btnGhost} ${ui.btnSm}`} href="/catalog">Весь каталог</Link>
        </div>

        <div className={styles.grid}>
          {list.map((p) => (
            <ProductCard key={p.id} product={p} tag={TAGS[p.id]} />
          ))}
        </div>

        <div className={styles.more}>
          <div className={styles.moreText}>
            <b>Ещё {products.length - list.length} {plural(products.length - list.length, "букет", "букета", "букетов")} в каталоге</b>
            <span>От шаров за 1 750 ₽ до букета-сердца за 27 000 ₽</span>
          </div>
          <Link className={`${ui.btn} ${ui.btnPrimary}`} href="/catalog">Открыть каталог</Link>
        </div>
      </div>
    </section>
  );
}
