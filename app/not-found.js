import Link from "next/link";
import ui from "./styles/ui.module.css";

export default function NotFound() {
  return (
    <main>
      <section className={ui.sec}>
        <div className={ui.shell} style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start" }}>
          <p className={ui.eyebrow}>Страница 404</p>
          <h1 className={ui.h1}>Такой страницы нет</h1>
          <p className={ui.lead}>Зато есть каталог: букеты-гиганты, коробки, круглые букеты и шары.</p>
          <Link className={`${ui.btn} ${ui.btnAccent}`} href="/catalog">Открыть каталог</Link>
        </div>
      </section>
    </main>
  );
}
