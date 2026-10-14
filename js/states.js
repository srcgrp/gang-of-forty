

export function renderError(container, options = {}) {
  if (!container) return;
  const {
    title = "خطا در دریافت اطلاعات",
    text = "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.",
    retryLabel = "تلاش مجدد",
    onRetry = null,
    errorType = "unknown",
  } = options;

  const icons = {
    offline: "📡", timeout: "⏱️", network: "🌐",
    http: "🚫", parse: "🧩", unknown: "⚠️",
  };
  const icon = icons[errorType] || "⚠️";

  container.innerHTML = `
    <li class="state-error" role="alert" data-error-type="${errorType}">
      <div class="state-error__icon" aria-hidden="true">${icon}</div>
      <h3 class="state-error__title">${title}</h3>
      <p class="state-error__text">${text}</p>
      ${onRetry ? `
        <div class="state-error__actions">
          <button type="button" class="btn-retry" data-retry>
            <span class="btn-retry__icon" aria-hidden="true">🔄</span>
            <span class="btn-retry__label">${retryLabel}</span>
          </button>
        </div>` : ""}
    </li>
  `;

  if (onRetry) {
    const btn = container.querySelector("[data-retry]");
    btn?.addEventListener("click", async () => {
      btn.classList.add("btn-retry--loading");
      btn.disabled = true;
      const lbl = btn.querySelector(".btn-retry__label");
      const ico = btn.querySelector(".btn-retry__icon");
      const ol = lbl.textContent, oi = ico.textContent;
      lbl.textContent = "در حال تلاش...";
      ico.textContent = "⏳";
      try { await onRetry(); }
      finally {
        if (btn.isConnected) {
          btn.classList.remove("btn-retry--loading");
          btn.disabled = false;
          lbl.textContent = ol;
          ico.textContent = oi;
        }
      }
    });
  }
}

export function renderEmpty(container, options = {}) {
  if (!container) return;
  const { title = "چیزی برای نمایش نیست",
          text = "به‌زودی محصولات جدید اضافه می‌شود.",
          icon = "📭" } = options;
  container.innerHTML = `
    <li class="state-empty">
      <div class="state-empty__icon" aria-hidden="true">${icon}</div>
      <h3 class="state-empty__title">${title}</h3>
      <p class="state-empty__text">${text}</p>
    </li>`;
}

export function renderSkeletonProducts(container, count = 4) {
  if (!container) return;
  container.innerHTML = Array.from({ length: count }).map(() => `
    <li class="skeleton-card" aria-hidden="true">
      <div class="skeleton skeleton-card__media"></div>
      <div class="skeleton skeleton-card__title"></div>
      <div class="skeleton skeleton-card__meta"></div>
      <div class="skeleton skeleton-card__price"></div>
    </li>`).join("");
}

export function renderSkeletonCategories(container, count = 7) {
  if (!container) return;
  container.innerHTML = Array.from({ length: count }).map(() => `
    <li class="skeleton-category" aria-hidden="true">
      <div class="skeleton skeleton-category__icon"></div>
      <div class="skeleton skeleton-category__title"></div>
    </li>`).join("");
}

// ─── بنر آفلاین ───
let offlineBannerEl = null;

export function showOfflineBanner() {
  if (offlineBannerEl) return;
  offlineBannerEl = document.createElement("div");
  offlineBannerEl.className = "offline-banner";
  offlineBannerEl.setAttribute("role", "alert");
  offlineBannerEl.innerHTML = `
    <span class="offline-banner__icon" aria-hidden="true">📡</span>
    <span class="offline-banner__text">
      اتصال اینترنت شما قطع شد — از داده‌های ذخیره‌شده استفاده می‌شود
    </span>`;
  document.body.prepend(offlineBannerEl);
  requestAnimationFrame(() => offlineBannerEl.classList.add("offline-banner--visible"));
}

export function hideOfflineBanner() {
  if (!offlineBannerEl) return;
  offlineBannerEl.classList.remove("offline-banner--visible");
  const el = offlineBannerEl;
  offlineBannerEl = null;
  setTimeout(() => el.remove(), 300);
}

// ─── Toast تلاش مجدد ───
export function showRetryToast({ attempt, total, waitMs }) {
  let toast = document.querySelector(".retry-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "retry-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <span class="retry-toast__spinner" aria-hidden="true"></span>
    <span>تلاش مجدد (${attempt}/${total}) — ${Math.ceil(waitMs / 1000)} ثانیه...</span>`;
  requestAnimationFrame(() => toast.classList.add("retry-toast--visible"));
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("retry-toast--visible");
    setTimeout(() => toast.remove(), 300);
  }, waitMs + 500);
}