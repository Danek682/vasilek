"use client";

import { useState, useEffect } from "react";
import ui from "../styles/ui.module.css";
import styles from "./CookieBanner.module.css";

const COOKIE_CONSENT_TEXT = "Мы используем файлы cookie для улучшения вашего опыта, анализа трафика и персонализированного контента. Нажимая «Принять», вы соглашаетесь с использованием cookie.";

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent");
    if (stored === "accepted") {
      setAccepted(true);
    }
  }, []);

  useEffect(() => {
    if (accepted) {
      localStorage.setItem("cookie_consent", "accepted");
    }
  }, [accepted]);

  if (accepted) return null;

  return (
    <div className={styles.banner} role="alert">
      <div className={styles.content}>
        <p>{COOKIE_CONSENT_TEXT}</p>
        <div className={styles.buttons}>
          <button
            className={`${ui.btn} ${ui.btnGhost}`}
            onClick={() => setAccepted(true)}
            aria-label="Принятьcookie"
          >
            Принять
          </button>
          <button
            className={`${ui.btn} ${ui.btnGhost}`}
            onClick={() => setAccepted(true)}
            aria-label="Отклонить"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
}