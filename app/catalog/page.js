import Catalog from "../components/Catalog";
import { getCatalog } from "@/lib/catalog";
import { SHOP } from "@/lib/shop";
import ui from "../styles/ui.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "Каталог букетов и коробок | Vasilek, Омск",
  description:
    "Букеты-гиганты, коробки и композиции, круглые букеты, фонтаны из гелиевых шаров. Цены от 1 750 ₽, доставка по Омску 350 ₽.",
};

export default async function CatalogPage() {
  const { categories, products } = await getCatalog();

  return (
    <main lang="ru">
      <section className={styles.top}>
        <div className={styles.topIn}>
          <div className={styles.topText}>
            <p className={ui.eyebrow}>Каталог</p>
            <h1 className={ui.h1}>Букеты в наличии</h1>
            <p className={ui.lead}>
              Добавляйте в корзину сколько нужно: сумма считается сразу, менеджер подтвердит состав по телефону.
            </p>
          </div>
          <div className={styles.meta}>
            <span className={ui.pill}>{products.length} позиций</span>
            <span className={ui.pill}>Доставка {SHOP.deliveryPrice} ₽</span>
            <span className={ui.pill}>Фото перед отправкой</span>
          </div>
        </div>
      </section>

      <section className={ui.sec}>
        <div className={ui.shell}>
          <Catalog categories={categories} products={products} />
        </div>
      </section>
    </main>
  );
}
