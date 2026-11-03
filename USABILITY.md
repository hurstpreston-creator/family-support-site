# Usability review and donation design

Reviewed November 2, 2026. The original public version is preserved at commit `b46e07eb19693fcf148276026d76b7aeaaa5a843` on [baseline-2026-11-02](https://github.com/hurstpreston-creator/family-support-site/tree/baseline-2026-11-02). Keep that branch unchanged as the initial baseline; publish ongoing work from `main`.

## Changes and rationale

- Larger reading text, labels, and touch targets support visitors reading on phones or with reduced vision. Cream, sage, personal typography, and gentle imagery retain the original tone.
- A persistent header keeps the donation entry point available, including outside the collapsed mobile menu. Section links remain available for repeat visitors seeking updates.
- The reading order is welcome → story → ways to help → updates → memories → sharing → encouragement. The story introduces the person and need before the donation choice. Visitors who already know the family can jump there immediately.
- All prominent support links lead to the same Ways to Help section, which explains the handoff to an external provider. A short message in the hero makes the current “links coming soon” state clear before visitors click.
- Once approved URLs are supplied, the first valid configured provider receives a single primary button. Other configured services follow as alternatives. Empty or invalid services are omitted from the active list. No research establishes a universal best order for GoFundMe, PayPal, and Venmo; a family-approved campaign with its story and goal is a reasonable first choice, followed by familiar alternatives. Reorder the array to choose.
- An explicit placeholder reserves space beside the donation panel for the family-approved explanation of how gifts will help. Nothing about costs, recipients, or use of funds has been invented.
- A copy-link action offers a useful way to help without spending money. There are no donation pop-ups, artificial deadlines, invented donor counts, or automatic payment embeds.
- The mobile gallery is more compact so visitors can reach later content without scrolling past three large placeholders.

These are design judgments informed by an expert review and the sources below, not measured conversion improvements or user testing with this family’s visitors.

## Is a goal or gauge wise?

A genuine, understandable funding goal can explain a need and give supporters context. A visual gauge is optional. The recommendation for this initial site is **leave it off until the family approves an actual goal and there is a trustworthy process to maintain the total**. Using the campaign provider’s own current balance may be simpler than maintaining a second display.

An optional local snapshot is supported through `fundraising` in `site-config.js`. It renders only when enabled, at least one approved-format donation URL is configured, goal and raised values are valid, the currency is formatted, an actual nonfuture date is supplied, and the scope is specified. Every displayed gauge says it is family-updated and not live. The check validates data shape, not account ownership or truth; the family must verify the figures.

The scope must make clear whether the number is for one campaign or an aggregate. Do not double-count transfers between providers. Keep the full raised amount visible if it exceeds the goal; the graphic caps at 100%. Do not quietly omit early donations or create fake progress to make a campaign look established. If the figure cannot be kept current, disable the local gauge and refer visitors to the provider.

## Research consulted

- [Nielsen Norman Group: Donation Usability](https://www.nngroup.com/articles/donation-usability/), primary usability research published in 2009. Participants needed a clear explanation of the cause and donation use, and some could not find the donation path. The research concerned nonprofit sites, so applying it to a family support page is an inference. It supports clear content and discoverable actions, not a precise universal page order.
- [Oslislo and Schwerter: Fundraising Goals and Charitable Giving](https://www.ifo.de/en/cesifo/publications/2026/working-paper/fundraising-goals-and-charitable-giving), CESifo Working Paper 12637 (2026). Two preregistered field experiments with regular donors of a large charity found goals increased giving; different displayed progress levels did not significantly change total donations. This is a working paper in a different setting, not proof of the same result for personal medical fundraising.
- [GoFundMe Pro: Progress metrics](https://prosupport.gofundme.com/hc/en-us/articles/37288737740187-Progress-metrics), updated August 2026. The vendor recommends progress displays and suggests waiting until around 20% to show one. That product guidance is not a universal finding, so this site does not hardcode that threshold or conceal real progress.

## Before personalization

Provide approved story text, photos with consent, a verified recipient/campaign link, and a factual explanation of donation use. A goal and gauge additionally require an approved amount, verified raised total, currency, reporting date, scope, and someone to maintain it. Until then, all public content remains generic and all payment links remain inactive.
