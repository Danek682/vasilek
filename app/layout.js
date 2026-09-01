import "./style.css";
import { CartProvider } from "./cart/CartProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import OrderModal from "./components/OrderModal";
import CookieBanner from "./components/CookieBanner";

export const metadata = {
  title: "Vasilek • букеты-гиганты | цветы Омск",
  description:
    "Первые в Омске основатели шикарных букетов-гигантов. Букеты, коробки и композиции от 1 750 ₽, фото перед отправкой, доставка по городу 350 ₽. ул. Малиновского 12/4.",
  keywords: ["букеты Омск", "букеты-гиганты", "цветы Омск", "доставка цветов Омск", "Малиновского 12/4"],
  openGraph: {
    title: "Vasilek • букеты-гиганты | цветы Омск",
    description: "Удиви своих любимых оригинальным букетом. Доставка по Омску, фото перед отправкой.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4effa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prata&family=Golos+Text:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
          <CookieBanner />
          <Footer />
          <CartDrawer />
          <OrderModal />
        </CartProvider>
      </body>
    </html>
  );
}
