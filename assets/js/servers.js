// ===== Servers: copy IP to clipboard + VMP hidden page =====
document.addEventListener("click", async e => {
  const open = e.target.closest("[data-open-vmp]");
  if (open) {
    document.getElementById("vmpModal")?.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    return;
  }
  if (e.target.closest("#vmpClose") || e.target.id === "vmpModal") {
    document.getElementById("vmpModal")?.setAttribute("hidden", "");
    document.body.style.overflow = "";
    return;
  }
  const b = e.target.closest("[data-copy]");
  if (!b) return;
  const ip = b.dataset.copy || "";
  try {
    await navigator.clipboard.writeText(ip);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = ip;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  if (typeof toast === "function") {
    const msg = (typeof t === "function" ? t("srv_copied") : "Copied!") + " " + ip;
    toast(msg);
  }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.getElementById("vmpModal")?.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }
});
