import { useState, type FormEvent } from "react";
import { Modal } from "./Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "login" | "register";

export function UserModal({ isOpen, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("login");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="user-modal-title"
      contentClassName="modal__content--user"
    >
      <header className="modal__header">
        <h2 className="modal__title" id="user-modal-title">
          <span aria-hidden="true">🔐</span>
          {tab === "login" ? "ورود به حساب" : "ساخت حساب جدید"}
        </h2>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="بستن"
        >
          ✕
        </button>
      </header>

      <div className="modal__body">
        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "login"}
            className={`auth-tab ${tab === "login" ? "is-active" : ""}`}
            onClick={() => setTab("login")}
          >
            ورود
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "register"}
            className={`auth-tab ${tab === "register" ? "is-active" : ""}`}
            onClick={() => setTab("register")}
          >
            ثبت‌نام
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === "register" && (
            <label className="auth-field">
              <span>نام و نام خانوادگی</span>
              <input
                type="text"
                placeholder="مثلاً علی رضایی"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}

          <label className="auth-field">
            <span>شماره موبایل</span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="09123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={11}
              dir="ltr"
            />
          </label>

          <label className="auth-field">
            <span>رمز عبور</span>
            <input
              type="password"
              placeholder="حداقل ۶ کاراکتر"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {tab === "login" && (
            <div className="auth-row">
              <label className="auth-checkbox">
                <input type="checkbox" />
                <span>مرا به خاطر بسپار</span>
              </label>
              <button type="button" className="auth-link">
                فراموشی رمز؟
              </button>
            </div>
          )}

          <button type="submit" className="btn btn--primary auth-submit">
            {tab === "login" ? "ورود به حساب" : "ثبت‌نام"}
          </button>

          <p className="auth-hint">
            {tab === "login" ? (
              <>
                حساب نداری؟{" "}
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => setTab("register")}
                >
                  همین حالا بساز
                </button>
              </>
            ) : (
              <>
                قبلاً ثبت‌نام کردی؟{" "}
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => setTab("login")}
                >
                  وارد شو
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </Modal>
  );
}
