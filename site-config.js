/* EDIT THIS FILE to personalize the site. Everything here is PUBLIC.
   Publish personal/medical details and photos only after family consent.
   Leave donation URLs empty until the family supplies approved, real links. */
window.SITE_CONFIG = {
  pageTitle: "Together, with love | Family Support",
  description: "A place for family, friends, and a little hope. Follow family updates, share in memories, and find ways to help.",
  siteUrl: "https://hurstpreston-creator.github.io/family-support-site/",
  familyName: "Family Support",
  familySignature: "the family",
  introduction: "A gathering place for family and friends to stay close, find updates, and offer support — one day at a time.",
  storyIsPlaceholder: true,
  storyLead: "There is so much more to a person than the difficult chapter they are going through.",
  storyParagraphs: [
    "[Introduce your loved one here: their personality, the people they love, and the everyday things that make them who they are.]",
    "[When the family is ready, share the parts of their journey they are comfortable making public, how life has changed, and what support would be helpful.]",
    "[Explain why financial support is needed and how it will help, using only details and claims approved by the family.]"
  ],
  // Use a local image path, descriptive alt text, and an optional caption.
  // Example: { src: "assets/family.jpg", alt: "A family-approved description", caption: "A moment together" }
  heroPhoto: { src: "", alt: "", caption: "Room for the moments that matter." },
  // Newest entries first. Real updates need an ISO date, e.g. YYYY-MM-DD.
  // Set example: false only for family-approved real updates.
  updates: [
    { date: "", category: "Family announcement", title: "A place to stay connected", body: "[Example: add a welcome message from the family and explain what visitors can expect from this space.]", example: true },
    { date: "", category: "Treatment update", title: "Notes from the journey", body: "[Example: add a dated, family-approved treatment update. Share only what your loved one is comfortable making public.]", example: true },
    { date: "", category: "Milestones & messages", title: "Making room for small moments", body: "[Example: share a meaningful milestone, a family moment, or a personal message of gratitude.]", example: true }
  ],
  // ONE LOCATION FOR PAYMENT LINKS. HTTPS only; never add credentials.
  // The first configured provider becomes the primary option in Ways to Help.
  donations: [
    { name: "GoFundMe", url: "" },
    { name: "Venmo", url: "" },
    { name: "PayPal", url: "" },
    { name: "Other ways to give", url: "" }
  ],
  // Replace empty src values with approved local photos; keep alt meaningful.
  photos: [
    { src: "", alt: "", caption: "The everyday moments" },
    { src: "", alt: "", caption: "The people we love" },
    { src: "", alt: "", caption: "The memories we keep" }
  ],
  // Optional public contact text; leave blank until approved. No form is used.
  contactText: ""
};
