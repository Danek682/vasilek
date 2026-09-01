import ui from "../styles/ui.module.css";
import styles from "./Steps.module.css";

const STEPS = [
  { n: "01", title: "Каталог", text: "Выбираете готовый букет или коробку и добавляете в корзину." },
  { n: "02", title: "Корзина", text: "Складываете несколько позиций, сумма считается сразу." },
  { n: "03", title: "Заявка", text: "Оформляете заказ: имя, телефон, доставка или самовывоз, дата и время." },
  { n: "04", title: "Менеджер", text: "Звоним, подтверждаем состав и время, присылаем фото перед отправкой." },
];

export default function Steps() {
  return (
    <section className={`${ui.sec} ${ui.secTight}`}>
      <div className={ui.shell}>
        <div className={styles.wrap}>
          <div className={ui.head}>
            <div className={ui.headText}>
              <p className={ui.eyebrow}>Как оформить</p>
              <h2 className={ui.h2}>Четыре шага до букета</h2>
            </div>
            <p className={ui.hint}>Предоплата не нужна: сначала подтверждаем состав, потом оплата.</p>
          </div>
          <div className={styles.list}>
            {STEPS.map((s) => (
              <article className={styles.step} key={s.n}>
                <p className={styles.n}>{s.n}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
