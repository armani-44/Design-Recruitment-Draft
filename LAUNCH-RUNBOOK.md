# Launch Runbook — Designer Recruitment®

Practical launch-day playbook for cutting over `designerrecruitment.co.uk` from the current setup to the new marketing site + branded FireFish jobs page.

**Owner:** Armani Conway (flowfortyfour) &middot; **Client:** Ben Paine (Designer Recruitment Ltd) &middot; **Backup:** Cara Tomkins

> **Read this end-to-end before launch day.** Every step assumes context from the ones before it.

---

## Pre-flight (everything green before you pick a launch date)

**Must all be TRUE before scheduling:**

- [ ] Legal pages signed off by solicitor. `[CONFIRM]` markers on `privacy.html`, `cookies.html`, `terms.html` all resolved.
- [ ] Stripe: either real Payment Links live on `cv-career-services/index.html`, or both Buy buttons hidden and rerouted to `/contact/?subject=CV%20enquiry`.
- [ ] Three spotlight studio-logo stubs replaced or explicitly accepted as-is (`placehold.co` stubs on Langstaff-Ellis, Faye Newman, Darren Morgan pages — small avatar chips, low-priority).
- [ ] Cross-browser QA: Safari (macOS + iOS), Chrome, Firefox all tested on top 6 pages. Anything broken → fixed.
- [ ] Lighthouse >= 85 on Performance and >= 95 on Accessibility for `/`, `/candidates/`, `/about/`, `/news-and-insights/`.
- [ ] Ben (or Cara) has created their own Netlify account. Confirmed email address for the account.
- [ ] StackDNS access obtained. Login credentials in your password manager.
- [ ] Analytics decision made. If GA4 or similar, cookie consent banner is live and functional.
- [ ] Ben and Cara briefed: what's happening, roughly when, what they should NOT click during the window.
- [ ] `404.html` builds and renders correctly (verified — this file lives at project root).
- [ ] All commits merged to `main` and `main` is deploying cleanly to `design-recruitment.netlify.app`.
- [ ] `git status` on `dev` and `main` is clean. No uncommitted work.

**Belt-and-braces sanity:**

- [ ] Screenshot **every** current DNS record in StackDNS. Save as `/dns-backup-<date>/` in a folder. If anything goes wrong you'll want to restore exactly.
- [ ] Note the current MX records, SPF (`v=spf1` TXT), DKIM (`selector._domainkey` TXT), DMARC (`_dmarc` TXT). These MUST survive untouched.
- [ ] Note the existing CNAME for `jobs.designerrecruitment.co.uk` → `20163.clients.firefishsoftware.com`. Untouched.
- [ ] Confirm what `designerrecruitment.co.uk` currently resolves to via `dig designerrecruitment.co.uk`. Record the IP(s).

---

## Launch window planning

**Pick a low-traffic window.** For a UK B2B recruiter, that's:
- **Best:** Weekday evening after 19:00 UK time
- **Good:** Weekend morning
- **Avoid:** Monday morning (interview scheduling peaks), month-end

**Allow 2 hours end-to-end.** Realistically 30 minutes of active work + up to 90 minutes of DNS propagation wait. Longer if anything goes sideways.

**Have Ben on standby by phone.** Not "watching over your shoulder" — but reachable if you need him to accept a Netlify transfer invitation or approve something in his inbox.

---

## Execution — the exact sequence

### Step 1 — Freeze changes (T-15 min)

- [ ] Announce in team chat / email: "Cutover in 15 min, don't push to `dev` or `main` until I say."
- [ ] Verify `main` is clean and last Netlify build succeeded: [https://app.netlify.com](https://app.netlify.com) → find the site → Deploys tab → most recent should be green.
- [ ] Open StackDNS in one browser tab, Netlify (both accounts) in others, GoDaddy in another. Have them all logged in.

### Step 2 — Netlify site transfer (T-0)

- [ ] In **your** (flowfortyfour) Netlify: navigate to the site → **Site configuration** → **General** → scroll to **Transfer site**.
- [ ] Click **Transfer site**. Enter the email address of Ben's (or Cara's) new Netlify account.
- [ ] Ben/Cara receives an email. **Ben accepts the invitation** from his inbox. You cannot proceed past this point until they click accept.
- [ ] Site now shows in Ben's Netlify account. Verify by having Ben log in and see the site listed.
- [ ] In Ben's Netlify, verify: (a) most recent deploy is still green; (b) build settings are the same; (c) the `design-recruitment.netlify.app` URL still serves the site.

**Why this order:** transferring before DNS means the site's still live at the Netlify subdomain throughout. No visitor sees any interruption because they're still hitting the old `designerrecruitment.co.uk` (which points at Ben's existing site).

### Step 3 — Add custom domain in Ben's Netlify (T+10)

- [ ] In Ben's Netlify: site → **Domain management** → **Add a domain**.
- [ ] Enter `designerrecruitment.co.uk`. Netlify checks the domain and gives you DNS records to add.
- [ ] Note the records Netlify wants. Typically:
  - **Apex** (`@`): use Netlify DNS (nameserver change) OR add an `ALIAS`/`ANAME` record to `apex-loadbalancer.netlify.com`, OR A records to Netlify's IPs.
  - **www**: `CNAME` to `<your-site>.netlify.app`.
- [ ] **Do NOT use "Set up Netlify DNS"** — that would move authoritative DNS to Netlify. We're keeping DNS at StackDNS because there are existing records (email, jobs CNAME) that shouldn't move.
- [ ] Enable **HTTPS** — Netlify auto-provisions a Let's Encrypt certificate once DNS propagates.

### Step 4 — Update DNS at StackDNS (T+15)

- [ ] In StackDNS, find the DNS zone for `designerrecruitment.co.uk`.
- [ ] Take a screenshot of the current state before changing anything.
- [ ] For the **apex** record (`@`), either:
  - Change existing A record(s) to point at Netlify's load-balancer IPs (Netlify will tell you which), OR
  - Add an `ALIAS`/`ANAME` record pointing at `apex-loadbalancer.netlify.com` (preferred if StackDNS supports these)
- [ ] For **www**: change/add a `CNAME` record: `www` → `<your-site>.netlify.app`.
- [ ] **DO NOT TOUCH:**
  - Any `MX` records (email)
  - Any `TXT` records containing `v=spf1`, `v=DMARC1`, or DKIM selectors (email auth)
  - The `CNAME` for `jobs` → `20163.clients.firefishsoftware.com` (FireFish jobs page)
  - Any `NS` records
- [ ] Save changes in StackDNS.

### Step 5 — Wait and verify (T+20 to T+50)

- [ ] Wait 5–10 minutes for initial propagation.
- [ ] Test resolution: `dig designerrecruitment.co.uk` — should return Netlify's IP(s), not the old ones.
- [ ] If still returning old IPs, wait another 10 minutes. TTLs vary; some ISPs cache aggressively.
- [ ] Once `dig` returns Netlify IPs, visit **https://designerrecruitment.co.uk** in an incognito window. Should serve the new marketing site.
- [ ] Test https://www.designerrecruitment.co.uk too — should redirect or serve identically.
- [ ] In Ben's Netlify: **Domain management** — the domain should now show a green padlock next to "Netlify DNS" (or wherever HTTPS status is indicated). If not, wait — Let's Encrypt takes up to 10 minutes to issue.

### Step 6 — Verify email still works (T+55)

- [ ] Send a test email to `ben@designerrecruitment.co.uk` (or `hello@`) from an outside address. Should arrive within a minute.
- [ ] Have Ben send an email out from his `ben@` address. Should send and be receivable.
- [ ] If email broke: **rollback immediately** (see Rollback below). Do not "wait and see" — email problems compound.

### Step 7 — Verify jobs subdomain still works (T+60)

- [ ] Visit https://jobs.designerrecruitment.co.uk in a fresh browser. Should serve FireFish with your branded blocks.
- [ ] Click a nav link (Home, About, Candidates) — they now resolve to the new marketing site (since DNS is cut over). This is the moment the nav "auto-activates".
- [ ] If the jobs page went blank: check FireFish CMS. Their DNS Settings tab might expect the domain to point somewhere different now. Contact Scott if so.

### Step 8 — Email Scott (T+65)

- [ ] Send the pre-drafted email to Scott McFarlane at FireFish:

> Subject: Follow-up — image URL swap on the branded blocks
>
> Hi Scott,
>
> Now that DNS is switched over to Ben's new site, could you swap the three image URLs in the header + footer blocks you installed earlier?
>
> Find: `https://design-recruitment.netlify.app/`
> Replace with: `https://designerrecruitment.co.uk/`
>
> Affects three `<img src>` lines total (block A header logo, block B CV section image, block B footer logo). No other changes needed.
>
> Thanks!
> Armani

### Step 9 — Analytics + Search Console (T+70)

- [ ] Google Search Console: add `designerrecruitment.co.uk` as a property. Verify via DNS TXT record (add TXT record in StackDNS).
- [ ] Submit the sitemap: `https://designerrecruitment.co.uk/sitemap.xml`.
- [ ] If Google Analytics is going live: paste the GA4 measurement tag into every page's `<head>` (or use a `_layout.html` include if we ever add a build step).
- [ ] Verify GA4 receives its first hit in real-time reporting.

### Step 10 — Announce (T+80)

- [ ] Ben announces the new site — LinkedIn post, email to key clients, etc. Timing is his call.
- [ ] Update any external references (LinkedIn "Website" field, email signatures, business cards mental note for the next print run).
- [ ] Unlock team chat — cutover is done.

---

## Rollback — if something goes wrong

**Rule of thumb:** if you find yourself thinking "I'll just wait and see if it fixes itself" — don't. Roll back, fix in a lower-stakes environment, retry.

### Scenario A — Email stops arriving after DNS change

**Cause:** most likely you (or StackDNS) accidentally overwrote MX / SPF / DKIM.

- [ ] In StackDNS, restore MX/SPF/DKIM records from the pre-cutover screenshots.
- [ ] Send a test email — should arrive within 5 minutes once records propagate.
- [ ] Investigate what happened before retrying.

### Scenario B — Marketing site 404s or shows the wrong content

**Cause:** DNS pointing wrong, or Netlify hasn't provisioned the domain yet.

- [ ] Check `dig designerrecruitment.co.uk` — is it returning Netlify's IPs?
- [ ] If yes but site is broken: check Ben's Netlify → Domain management. Is the domain listed? Is HTTPS active?
- [ ] If HTTPS is still "Provisioning", wait 10 more minutes.
- [ ] If it's been >20 minutes: in StackDNS, revert the apex A/ALIAS record to the OLD value (from screenshots). Site will fall back to the old address. Debug Netlify configuration before retrying.

### Scenario C — FireFish jobs page breaks

**Cause:** Unlikely (their DNS setting is a separate CNAME), but if it happens, check FireFish DNS Settings tab to confirm `jobs.` still resolves to `20163.clients.firefishsoftware.com`.

- [ ] If the CNAME record was accidentally touched, restore it from screenshot.
- [ ] Contact Scott if the issue is on FireFish's end.

### Scenario D — Netlify build fails after transfer

**Cause:** Environment variables, build settings, or repo access lost in transfer.

- [ ] Check build logs in Ben's Netlify.
- [ ] Common issue: the GitHub connection is per-Netlify-account. Ben may need to reconnect the repo (or you may need to grant him access on GitHub).
- [ ] Meanwhile the last successful deploy is still served — no user-visible impact until a new deploy is attempted.

### Nuclear rollback (last resort)

If DNS is fundamentally broken and rollback attempts aren't propagating:

- [ ] In StackDNS, revert **every** record to match the pre-cutover screenshots exactly.
- [ ] Wait 30 min for propagation.
- [ ] Ben's existing site + email should be fully restored.
- [ ] Schedule a debug session before attempting the cutover again.

---

## Post-launch checklist

### Within 1 hour

- [ ] Visit every page of the marketing site from a real device (not just a browser incognito).
- [ ] Submit each form: contact, post-a-job, apply. Confirm they arrive.
- [ ] Confirm SSL padlock shows on every page.
- [ ] Confirm redirect from `http://` to `https://` works (Netlify does this automatically).
- [ ] Confirm redirect from `www.` to apex (or vice versa — Ben's preference).
- [ ] Verify no console errors in browser DevTools.

### Within 24 hours

- [ ] Check Netlify analytics (or GA4 if enabled) — is real traffic arriving?
- [ ] Check Search Console for any crawl errors.
- [ ] Read the top 3 pages on a slow 3G connection — anything painfully slow?
- [ ] Confirm email deliverability by asking Ben if he's had any bounced emails or missed replies.
- [ ] Test each social share (LinkedIn, X) shows the correct OG image + description.

### Within 1 week

- [ ] Review any 404s in Netlify logs. Set up redirects for any external inbound links that broke.
- [ ] Confirm Search Console starts indexing pages (initial coverage report).
- [ ] Do the FireFish image URL swap when Scott confirms it's done.
- [ ] Reset your (Armani's) password on the flowfortyfour Netlify — you no longer own the site, but ensure you're not accidentally logged into Ben's account with saved credentials.
- [ ] Update your memory / project notes: launch complete, next milestone.

---

## Contacts

| Role | Name | Reach |
|---|---|---|
| Client (primary) | Ben Paine | ben@designerrecruitment.co.uk / mobile |
| Client (backup) | Cara Tomkins | cara@designerrecruitment.co.uk |
| FireFish support | Scott McFarlane | via FireFish support channel |
| Netlify support | — | https://answers.netlify.com (community) or support ticket if on paid plan |
| Domain registrar | GoDaddy | via Ben's GoDaddy login |
| DNS host | StackDNS | via whoever Ben identified as having access |

---

## After launch — small housekeeping items to schedule

- [ ] Remove any hard-coded references to `design-recruitment.netlify.app` from the codebase (search and swap for `designerrecruitment.co.uk`).
- [ ] Revisit the FireFish blocks with Scott every ~6 months to ensure the CSS + HTML haven't drifted from the marketing site's design system.
- [ ] Set a calendar reminder for the domain renewal at GoDaddy (annual).
- [ ] Set a calendar reminder to review analytics + SEO 30 days post-launch.
- [ ] Consider adding structured data for JobPosting on the candidates page (from audit — pending).
- [ ] Consider migrating repeated nav/footer HTML into a proper build step (from audit — deferred).
