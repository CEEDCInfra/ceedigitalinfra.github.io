(() => {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".menu-toggle");
  const year = document.getElementById("year");
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

  const form = document.getElementById("weekly-form");
  if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!status) return;
      status.classList.remove("is-success", "is-error");
      status.textContent = "Sending…";
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Request failed");
        status.textContent = "Thanks. We’ll be in touch.";
        status.classList.add("is-success");
        form.reset();
      } catch {
        status.innerHTML =
          'Something went wrong. Email <a class="mail" href="mailto:editor@ceedigitalinfra.com">editor@ceedigitalinfra.com</a>.';
        status.classList.add("is-error");
      }
    });
  }
})();
