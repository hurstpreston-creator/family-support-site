"use strict";
(() => {
  const config = window.SITE_CONFIG;
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#navigation");
  menu.hidden = false;
  const closeMenu = () => { menu.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-label", "Open navigation menu"); nav.classList.remove("is-open"); };
  menu.addEventListener("click", () => { const open = menu.getAttribute("aria-expanded") !== "true"; menu.setAttribute("aria-expanded", String(open)); menu.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu"); nav.classList.toggle("is-open", open); });
  nav.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") { closeMenu(); menu.focus(); } });
  if (!config) return;
  const setText = (selector, value) => { document.querySelector(selector).textContent = value; };
  const element = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text) node.textContent = text; return node; };
  document.title = config.pageTitle;
  document.querySelector('meta[name="description"]').content = config.description;
  document.querySelector('meta[property="og:title"]').content = config.pageTitle;
  document.querySelector('meta[property="og:description"]').content = config.description;
  if (config.siteUrl) document.querySelector('meta[property="og:url"]').content = config.siteUrl;
  setText("#introduction", config.introduction);
  setText("#family-signature", config.familySignature);
  setText("#copyright-name", config.familyName);
  setText("#year", String(new Date().getFullYear()));
  if (config.contactText) setText("#family-contact", config.contactText);
  if (config.supportPurpose?.trim()) setText("#support-purpose", config.supportPurpose);
  const copyButton = document.querySelector("#copy-page-link");
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    // Copy only the canonical public address, never a visitor's query parameters.
    const publicUrl = config.siteUrl;
    try {
      if (new URL(publicUrl).protocol !== "https:") throw new Error("Invalid public URL");
      await navigator.clipboard.writeText(publicUrl);
      setText("#share-status", "Link copied. Thank you for sharing with care.");
    } catch {
      const fallback = document.querySelector("#share-link-fallback");
      fallback.value = publicUrl;
      fallback.hidden = false;
      fallback.focus();
      fallback.select();
      setText("#share-status", "Select and copy the public page link below.");
    }
  });
  document.querySelector(".edit-label").hidden = !config.storyIsPlaceholder;
  const story = document.querySelector("#story-content");
  const signoff = story.querySelector(".story-signoff");
  story.replaceChildren(element("p", "story-lead", config.storyLead), ...config.storyParagraphs.map(text => element("p", "", text)), signoff);
  // Only local assets are accepted for family photos; no remote tracking pixels.
  const localPhoto = src => typeof src === "string" && /^assets\/[a-z0-9_./-]+\.(?:avif|webp|jpe?g|png)$/i.test(src) && !src.includes("..");
  if (localPhoto(config.heroPhoto.src) && config.heroPhoto.alt.trim()) {
    const img = document.querySelector(".photo-art img"); img.src = config.heroPhoto.src; img.alt = config.heroPhoto.alt; img.classList.add("family-photo");
    document.querySelector(".photo-label").remove(); document.querySelector(".photo-center").remove();
  }
  setText(".handwritten", config.heroPhoto.caption);
  const updates = document.querySelector("#updates-list");
  if (!config.updates.length) updates.append(element("p", "", "Family updates will appear here when the family is ready."));
  const hasExamples = config.updates.some(update => update.example);
  setText(".section-description", hasExamples ? "Entries marked “Example” show how future updates will appear. They do not describe real events or medical information." : "Family-approved notes, milestones, and messages, shared as the family is ready.");
  config.updates.forEach(update => {
    const card = element("article", "update-card");
    const meta = element("div", "update-meta");
    if (update.example) meta.append(element("span", "example-tag", "EXAMPLE"));
    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(update.date) && !Number.isNaN(Date.parse(`${update.date}T12:00:00Z`));
    if (validDate) { const time = element("time", "", new Intl.DateTimeFormat("en-US", {month:"long",day:"numeric",year:"numeric",timeZone:"UTC"}).format(new Date(`${update.date}T12:00:00Z`))); time.dateTime = update.date; meta.append(time); }
    else meta.append(element("span", "", update.example ? "Date to be added" : "Date pending"));
    card.append(meta, element("p", "update-category", update.category), element("h3", "", update.title), element("p", "update-body", update.body)); updates.append(card);
  });
  const acceptedDonation = item => {
    if (!item.url) return false;
    try {
      const url = new URL(item.url);
      if (url.protocol !== "https:" || url.username || url.password || /(?:example\.(?:com|org)|localhost|your[-_]|placeholder)/i.test(url.href)) return false;
      const allowed = { GoFundMe: ["gofundme.com"], Venmo: ["venmo.com"], PayPal: ["paypal.com", "paypal.me"] }[item.name];
      return !allowed || allowed.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`));
    } catch { return false; }
  };
  const active = config.donations.filter(acceptedDonation);
  const donationLinks = document.querySelector("#donation-links");
  const externalLink = (item, className, label) => {
    const link = element("a", className, label);
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${label} (opens in a new tab)`);
    return link;
  };
  if (active.length) {
    setText("#donation-status", "Give with love.");
    setText("#donation-description", "Choose a family-approved way to give. You will continue to the provider’s own website to complete your donation.");
    setText(".hero-support", "Support our family ↓");
    setText("#hero-donation-note", "Give through an approved provider. Every kind gesture matters.");
    donationLinks.append(externalLink(active[0], "button button-primary primary-donation", `Donate with ${active[0].name} ↗`));
    donationLinks.append(element("p", "provider-explanation", `Opens ${active[0].name} in a new tab.`));
    if (active.length > 1) donationLinks.append(element("p", "alternate-label", "Other ways to give"));
    active.slice(1).forEach(item => {
      const link = externalLink(item, "donation-row is-active", `Give with ${item.name}`);
      link.append(element("span", "provider-status", "↗"));
      donationLinks.append(link);
    });
    active.forEach(item => document.querySelector("#footer-donations").append(externalLink(item, "", item.name)));
  } else {
    donationLinks.append(element("p", "pending-providers", "Planned options include GoFundMe, Venmo, and PayPal. No payment links are active yet."));
  }
  // A truthful, dated snapshot is optional. Never invent or auto-increment totals.
  const funding = config.fundraising;
  const date = funding?.asOf;
  const dateValue = /^\d{4}-\d{2}-\d{2}$/.test(date || "") ? new Date(`${date}T12:00:00Z`) : null;
  const validDate = dateValue && !Number.isNaN(dateValue.valueOf()) && dateValue.toISOString().slice(0, 10) === date && date <= new Date().toISOString().slice(0, 10);
  if (active.length && funding?.enabled === true && Number.isFinite(funding.goal) && funding.goal > 0 && Number.isFinite(funding.raised) && funding.raised >= 0 && validDate && funding.scope?.trim() && /^[A-Z]{3}$/.test(funding.currency)) {
    try {
      const money = new Intl.NumberFormat("en-US", {style: "currency", currency: funding.currency, minimumFractionDigits: 0, maximumFractionDigits: 2});
      const container = document.querySelector("#fundraising-progress");
      const heading = element("p", "fundraising-amount", `${money.format(funding.raised)} raised of ${money.format(funding.goal)} goal`);
      heading.id = "fundraising-label";
      const progress = element("progress");
      progress.max = funding.goal;
      progress.value = Math.min(funding.raised, funding.goal);
      progress.setAttribute("aria-labelledby", heading.id);
      const dateText = new Intl.DateTimeFormat("en-US", {month: "long", day: "numeric", year: "numeric", timeZone: "UTC"}).format(dateValue);
      container.append(heading, progress, element("p", "fundraising-note", `${funding.scope}. Family-updated as of ${dateText}; this is not a live total.`));
      container.hidden = false;
    } catch { /* Invalid currency configuration leaves the entire gauge hidden. */ }
  }
  config.photos.forEach((photo, i) => {
    const figure = element("figure", `memory memory-${i % 3}`);
    if (localPhoto(photo.src) && photo.alt.trim()) { const img = element("img"); img.src = photo.src; img.alt = photo.alt; img.loading = "lazy"; img.width = 680; img.height = 640; figure.append(img); }
    else { const placeholder = element("div", "memory-placeholder"); placeholder.setAttribute("role", "img"); placeholder.setAttribute("aria-label", "Photo placeholder. No family photo has been published."); placeholder.append(element("span", "memory-symbol", ["✧", "♡", "✳"][i % 3]), element("span", "", "A family photo will go here")); figure.append(placeholder); }
    figure.append(element("figcaption", "", photo.caption)); document.querySelector("#photo-gallery").append(figure);
  });
})();
