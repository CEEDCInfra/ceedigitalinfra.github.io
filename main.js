(() => {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".menu-toggle");
  const year = document.getElementById("year");
  const form = document.getElementById("weekly-form");
  const status = document.getElementById("form-status");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = form.querySelector("#email");
    const honey = form.querySelector("[name='_honey']");
    if (!(email instanceof HTMLInputElement) || !email.value.trim()) return;
    if (honey instanceof HTMLInputElement && honey.value) return;

    status.className = "form-status";
    status.textContent = "Sending…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value.trim(),
          _subject: "CEE Digital Infra Weekly — new subscriber",
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      status.classList.add("is-success");
      status.textContent = "Thank you. You are on the list for the weekly briefing.";
      form.reset();
    } catch (error) {
      status.classList.add("is-error");
      status.textContent =
        "The form could not be sent just now. Email editor@ceedigitalinfra.com and we will add you.";
    }
  });
})();
