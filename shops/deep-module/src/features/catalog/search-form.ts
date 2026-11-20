export function setupSearchFormEvents(
  input: HTMLInputElement,
  form: HTMLFormElement | null,
  clearBtn: HTMLButtonElement | null,
  applyFilter: (query: string) => void,
  close: () => void,
): void {
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      input.value = "";
      clearBtn.hidden = true;
      applyFilter("");
      close();
      input.focus();
    });
  }

  if (form) {
    form.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      applyFilter(q);
      close();
      document
        .getElementById("all-products")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}
