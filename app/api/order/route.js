import { rub } from "@/lib/format";
import { SHOP } from "@/lib/shop";

/* Заявка из модального окна уходит письмом на почту магазина.
   Нужны переменные из .env.example. Без SMTP заявка не теряется:
   она попадает в лог сервера, а покупателю показываем телефон. */

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Некорректный запрос" }, { status: 400 });
  }

  const { customer = {}, items = [], total = 0 } = payload;
  const name = String(customer.name || "").trim();
  const phone = String(customer.phone || "").trim();

  if (name.length < 2 || phone.length < 6) {
    return Response.json({ ok: false, message: "Укажите имя и телефон" }, { status: 422 });
  }
  if (!customer.consent) {
    return Response.json({ ok: false, message: "Нужно согласие на обработку данных" }, { status: 422 });
  }
  if (!items.length) {
    return Response.json({ ok: false, message: "Корзина пуста" }, { status: 422 });
  }

  const way = customer.way === "pickup" ? "Самовывоз" : "Доставка";
  const lines = items.map((i) => `• ${i.title} × ${i.qty} — ${rub(i.price * i.qty)}`).join("\n");

  const text = [
    `Новая заявка с сайта ${SHOP.name}`,
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Способ получения: ${way}`,
    customer.way === "pickup" ? `Адрес самовывоза: ${SHOP.addressFull}` : `Адрес доставки: ${customer.address || "не указан"}`,
    `Дата: ${customer.date || "не указана"}`,
    `Время: ${customer.time || "не указано"}`,
    `Комментарий: ${customer.comment || "нет"}`,
    "",
    "Состав заказа:",
    lines,
    "",
    `Итого букеты: ${rub(total)}`,
    customer.way === "pickup" ? "Доставка: не требуется" : `Доставка: ${SHOP.deliveryPrice} ₽`,
  ].join("\n");

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ORDER_EMAIL_TO, ORDER_EMAIL_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ORDER_EMAIL_TO) {
    console.warn("[order] SMTP не настроен, заявка только в логе:\n" + text);
    return Response.json({
      ok: true,
      delivered: false,
      message: "Заявка принята, но письмо не отправлено: не настроен SMTP",
    });
  }

  try {
    const nodemailer = (await import("nodemailer")).default;
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 465),
      secure: Number(SMTP_PORT || 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transport.sendMail({
      from: ORDER_EMAIL_FROM || SMTP_USER,
      to: ORDER_EMAIL_TO,
      replyTo: undefined,
      subject: `Заявка с сайта: ${name}, ${rub(total)}`,
      text,
    });

    return Response.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[order] письмо не ушло:", error?.message, "\n" + text);
    return Response.json(
      { ok: false, message: `Не удалось отправить заявку. Позвоните нам: ${SHOP.phone}` },
      { status: 502 }
    );
  }
}
