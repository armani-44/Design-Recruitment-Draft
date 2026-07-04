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
- [ ] Site has been transferred from flowfortyfour's Netlify to Ben's Netlify. Ben's netlify.app slug is knowable.
- [ ] Full StackDNS zone export received from David Martin (BIND, CSV, or comprehensive screenshots). Cross-checked against `dig` baseline in Appendix A.
- [ ] DKIM selector name(s) confirmed with David AND/OR verified by Ben in his Microsoft 365 admin console. If DKIM is not currently configured, that is explicitly noted — the migration preserves current state, DKIM setup is a post-launch task.
- [ ] David has confirmed StackDNS will keep the zone intact and unmodified for 2 weeks post-cutover as our rollback target.
- [ ] Analytics decision made. If GA4 or similar, cookie consent banner is live and functional.
- [ ] Ben and Cara briefed: what's happening, roughly when, what they should NOT click during the window.
- [ ] `404.html` builds and renders correctly (verified — this file lives at project root).
- [ ] All commits merged to `main` and `main` is deploying cleanly to `design-recruitment.netlify.app`.
- [ ] `git status` on `dev` and `main` is clean. No uncommitted work.

**Belt-and-braces sanity:**

- [ ] Full DNS baseline captured via `dig` on 4 July 2026 — saved in Appendix A. Cross-check David's StackDNS export against this baseline before rebuilding the Netlify zone; every record present in either source must exist in the rebuilt zone unless explicitly retired.
- [ ] Confirmed via baseline: MX (M365 — priority 0 to `designerrecruitment-co-uk.mail.protection.outlook.com`), SPF (`v=spf1 include:spf.protection.outlook.com include:spf.stackmail.com -all`), no DMARC currently in place, DKIM to be confirmed with David.
- [ ] Confirmed via baseline: `jobs.designerrecruitment.co.uk` CNAME → `20163.clients.firefishsoftware.com`. Preserve verbatim in the rebuilt Netlify zone.
- [ ] Confirmed via baseline: DNSSEC is NOT currently active on the zone (no DS record at the .co.uk parent). No DS coordination needed at GoDaddy pre-cutover.
- [ ] Confirmed via baseline: current apex resolves to `185.151.30.151` (A) + `2a07:7800::151` (AAAA). Both replaced at cutover by Netlify's ALIAS at apex.

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

### Step 3 — Enable Netlify DNS in Ben's account (T+10)

- [ ] In Ben's Netlify: **Domains** (top-level nav, not the per-site Domain management panel) → **Add or transfer a domain** → enter `designerrecruitment.co.uk`.
- [ ] When prompted, choose **Netlify DNS** (NOT "External DNS"). Netlify creates a hosted zone under Ben's account.
- [ ] Netlify displays 4 nameservers of the form `dns1.p0X.nsone.net` through `dns4.p0X.nsone.net`. **Copy these somewhere you can find them again** — you'll need them at Step 6. Do NOT enter them at GoDaddy yet.
- [ ] In the new zone, verify Netlify auto-created:
  - **ALIAS at `@`** → `apex-loadbalancer.netlify.com` (CNAME-flattened at query time — future-proof against Netlify IP rotation)
  - **CNAME `www`** → Ben's `.netlify.app` slug (whatever the transferred site's URL is)
- [ ] If Netlify created placeholder A records at `@` instead of an ALIAS, delete them and add the ALIAS manually. The ALIAS is the whole reason we're using Netlify DNS.

### Step 4 — Populate the Netlify zone from David's export (T+20)

Recreate every record from David's StackDNS export inside the Netlify zone. Use this order — it front-loads the email-critical records so a mistake fails loud early:

- [ ] **MX** — priority 0, target `designerrecruitment-co-uk.mail.protection.outlook.com` (from David's export). Copy priority + target exactly.
- [ ] **SPF TXT at `@`** — paste the string byte-for-byte. Baseline: `"v=spf1 include:spf.protection.outlook.com include:spf.stackmail.com -all"`. **Use a plain-text editor as the intermediate** — Netlify's admin UI, Gmail compose, and Google Docs will silently convert straight quotes to smart quotes, killing the SPF record.
- [ ] **DMARC TXT at `_dmarc`** — only if David's export shows one. Baseline shows no DMARC currently. If none, skip (add post-launch as a separate improvement).
- [ ] **DKIM** — from David's confirmed selector list. For M365, likely `selector1._domainkey` and `selector2._domainkey` as CNAMEs to Microsoft's DKIM host. If David reports no DKIM is currently configured, skip and add to post-launch TODO — do not invent selectors.
- [ ] **CNAME `jobs`** → `20163.clients.firefishsoftware.com` (verbatim — this is FireFish's live ATS)
- [ ] **CNAME `autodiscover`** → `autodiscover.outlook.com` (M365 Outlook client auto-config — new devices depend on this)
- [ ] **Any other subdomain records** in David's export (mail, webmail, smtp, imap, ftp, staging, etc). Baseline shows most subdomains currently resolve to StackCP's `185.151.30.151` — possibly a wildcard A record. Confirm with David whether these are individual records or a `*` wildcard, and replicate accordingly. Netlify DNS supports both.
- [ ] **CAA at `@`** — if David's export has one, replicate exactly. If none exists (baseline confirms none), add `0 issue "letsencrypt.org"` to guarantee Netlify's SSL renewals work.
- [ ] Use TTL **300** for every record during the cutover window; raise to **3600** at post-launch T+24h.
- [ ] **Do NOT add records absent from both David's export and Appendix A's dig baseline.** Extras become surprises.

### Step 5 — Verify the staged zone before flipping nameservers (T+40)

Query Netlify's nameservers directly — this bypasses the still-live StackDNS zone, so you're testing Netlify's zone as if it were already authoritative:

- [ ] `dig @dns1.p0X.nsone.net designerrecruitment.co.uk MX +short` → M365 target
- [ ] `dig @dns1.p0X.nsone.net designerrecruitment.co.uk TXT +short` → the SPF string, byte-identical
- [ ] `dig @dns1.p0X.nsone.net jobs.designerrecruitment.co.uk CNAME +short` → `20163.clients.firefishsoftware.com`
- [ ] `dig @dns1.p0X.nsone.net autodiscover.designerrecruitment.co.uk CNAME +short` → `autodiscover.outlook.com`
- [ ] `dig @dns1.p0X.nsone.net designerrecruitment.co.uk A +short` → Netlify's load-balancer IP (currently `75.2.60.5`)
- [ ] `dig @dns1.p0X.nsone.net designerrecruitment.co.uk ANY +noall +answer` — diff against David's export line-for-line
- [ ] **If ANY discrepancy: fix in Netlify BEFORE proceeding.** The nameserver switch is atomic; you cannot un-cut mid-way.

### Step 6 — Change nameservers at GoDaddy (T+55 — THE ATOMIC CUTOVER)

- [ ] Ben logs into GoDaddy with his credentials. You cannot do this step for him — GoDaddy's owner-verification often requires his email confirmation.
- [ ] Navigate to `designerrecruitment.co.uk` → **Domain Settings** → **Nameservers** → **Change**.
- [ ] Select "I'll use my own nameservers".
- [ ] Delete the four StackDNS nameservers (`ns1.stackdns.com` through `ns4.stackdns.com`).
- [ ] Paste in Netlify's four `dns1-4.p0X.nsone.net` values from Step 3.
- [ ] Save. GoDaddy may email Ben a confirmation link — he must click it within a few minutes.
- [ ] **Note the exact time.** This is T=0 for propagation.

### Step 7 — Verify propagation (T+60 to T+120)

- [ ] Query multiple public resolvers every 5 minutes: `dig NS designerrecruitment.co.uk @1.1.1.1`, `@8.8.8.8`, `@9.9.9.9`. Wait for all to return Netlify's `nsone.net` nameservers.
- [ ] Cross-check globally at [whatsmydns.net](https://www.whatsmydns.net/) — enter the domain, select NS, watch the map turn green.
- [ ] Typical propagation: 15–60 minutes for public resolvers. Worst case: 24–48 hours for stragglers behind Nominet's TLD cache. Do NOT panic if a few regions stay old for hours — as long as the majority migrates.
- [ ] Once NS has propagated to your local resolver: `dig designerrecruitment.co.uk MX @1.1.1.1` should return the M365 MX (proving the Netlify zone is authoritative for records other than NS).

### Step 8 — Verify email still works (T+125)

- [ ] Send a test email inbound to `ben@designerrecruitment.co.uk` from an outside address (Gmail personal, a colleague's inbox, whatever). Should arrive within 60 seconds.
- [ ] Ben sends outbound from `ben@` to a `mail-tester.com` address (or a Gmail personal). Confirm **SPF=pass**. If DKIM was configured pre-migration, confirm DKIM=pass too. Check the outbound didn't land in spam.
- [ ] Test both an outbound to Gmail *and* an outbound to Outlook.com — different providers stress-test different parts of the auth stack.
- [ ] **If email broke: do NOT try to hot-fix records in Netlify.** Roll back at GoDaddy per Scenario A. Fix the missing record offline, retry in the next window.

### Step 9 — Verify jobs subdomain still works (T+135)

- [ ] Visit `https://jobs.designerrecruitment.co.uk` in a fresh incognito. Should serve FireFish with the branded blocks.
- [ ] Click a nav link (Home, About, Candidates) — they now resolve to the new marketing site. This is the moment the nav "auto-activates" across the whole ecosystem.
- [ ] If the jobs page went blank: `dig jobs.designerrecruitment.co.uk @1.1.1.1` — if the CNAME target is right but the page 404s, contact Scott (FireFish-side issue, not DNS).

### Step 10 — Email Scott (T+140)

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

### Step 11 — Analytics + Search Console (T+150)

- [ ] Google Search Console: add `designerrecruitment.co.uk` as a property. Verify via a TXT record — add it in **Netlify DNS** (not StackDNS, which is no longer authoritative).
- [ ] Submit the sitemap: `https://designerrecruitment.co.uk/sitemap.xml`.
- [ ] If Google Analytics is going live: paste the GA4 measurement tag into every page's `<head>` (or use a `_layout.html` include if we ever add a build step).
- [ ] Verify GA4 receives its first hit in real-time reporting.

### Step 12 — Announce (T+160)

- [ ] Ben announces the new site — LinkedIn post, email to key clients, etc. Timing is his call.
- [ ] Update any external references (LinkedIn "Website" field, email signatures, business cards mental note for the next print run).
- [ ] Unlock team chat — cutover is done.

---

## Rollback — if something goes wrong

**Rule of thumb:** if you find yourself thinking "I'll just wait and see if it fixes itself" — don't. Roll back, fix in a lower-stakes environment, retry.

**The atomic rollback is nameserver reversal at GoDaddy.** Because the entire zone moved to Netlify DNS at cutover, we do not try to hot-fix individual records under fire. If anything email-related is broken, flip the nameservers back at GoDaddy to `ns1-4.stackdns.com`. StackDNS still holds the original, untouched zone (we asked David to preserve it for 2 weeks). Propagation on the reversal is fast because we lowered TTLs pre-cutover.

### Scenario A — Email stops arriving (or lands in spam) after cutover

**Cause:** most likely a record was missed when rebuilding the Netlify zone. Highest-risk culprit: a DKIM CNAME on a selector name we didn't know about. Second-most-likely: SPF string was mangled by smart-quote conversion.

- [ ] Ben logs into GoDaddy → Domain Settings → Nameservers → **Change back to `ns1.stackdns.com`, `ns2.stackdns.com`, `ns3.stackdns.com`, `ns4.stackdns.com`**. Save.
- [ ] Wait 15 minutes for NS propagation (TTLs were pre-lowered).
- [ ] Send a test email inbound. Should arrive within 5 minutes.
- [ ] Investigate offline what was missing in the Netlify zone. Add it. Re-verify by dig against Netlify's NS. Retry cutover in the next scheduled window.

### Scenario B — Marketing site 404s, shows the wrong content, or has no HTTPS

**Cause:** the ALIAS at apex wasn't populated correctly, the site isn't linked to the domain in Ben's Netlify, or Let's Encrypt is still provisioning.

- [ ] `dig designerrecruitment.co.uk A @1.1.1.1` — is it returning a Netlify load-balancer IP (currently `75.2.60.5`)?
- [ ] If yes but the site is broken: check Ben's Netlify → the zone → confirm the ALIAS at `@` is present and points to `apex-loadbalancer.netlify.com`. Confirm the site is linked to the domain (Domain settings → Custom domains lists it).
- [ ] If HTTPS is still "Provisioning" in Netlify, wait 10 more minutes — Let's Encrypt sometimes takes a full round of DNS propagation.
- [ ] If >20 minutes and still broken: flip nameservers back at GoDaddy per Scenario A. Debug the ALIAS + site-link offline. Retry.

### Scenario C — FireFish jobs page breaks

**Cause:** the `jobs` CNAME was missed or mistyped when rebuilding the zone.

- [ ] `dig jobs.designerrecruitment.co.uk @dns1.p0X.nsone.net` — does it return `20163.clients.firefishsoftware.com`?
- [ ] If NOT: add or fix the CNAME in Netlify DNS. Propagation is ~5 min at 300s TTL.
- [ ] If yes but the page is still blank: it's a FireFish-side issue, not DNS. Message Scott.

### Scenario D — Netlify build fails after site transfer

**Cause:** GitHub repo linkage, environment variables, or build settings didn't survive the site transfer. Unrelated to DNS.

- [ ] Check build logs in Ben's Netlify.
- [ ] Common issue: the GitHub connection is per-Netlify-account. Ben may need to reconnect the repo (or you may need to grant his account access on GitHub).
- [ ] Meanwhile the last successful deploy continues to serve — no user-visible impact until the next deploy is attempted.

### Nuclear rollback (last resort)

If email, site, and jobs are ALL broken and switching nameservers back doesn't restore Ben's inbox within 30 minutes:

- [ ] Confirm at GoDaddy the nameservers ARE reverted to StackDNS (`ns1-4.stackdns.com`).
- [ ] `dig NS designerrecruitment.co.uk @8.8.8.8` — resolvers should show StackDNS again within 15–30 minutes.
- [ ] `dig MX designerrecruitment.co.uk @8.8.8.8` — MX record should return the M365 target from the StackDNS zone.
- [ ] Test email + jobs + site — all should be back to pre-cutover state (Ben's WordPress site + email flowing).
- [ ] If STILL broken after 60 minutes: escalate to David for zone integrity check + Netlify support ticket if the site remains a red herring. Do NOT retry cutover until every scenario is understood.

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
- [ ] **Raise TTLs on the Netlify zone from 300 back to 3600** — reduces query load on Netlify's nameservers. Cutover-emergency window is over.

### Within 1 week

- [ ] Review any 404s in Netlify logs. Set up redirects for any external inbound links that broke.
- [ ] Confirm Search Console starts indexing pages (initial coverage report).
- [ ] Do the FireFish image URL swap when Scott confirms it's done.
- [ ] Reset your (Armani's) password on the flowfortyfour Netlify — you no longer own the site, but ensure you're not accidentally logged into Ben's account with saved credentials.
- [ ] Update your memory / project notes: launch complete, next milestone.

### After 2 weeks — StackDNS decommission

- [ ] Two weeks post-cutover: message David to confirm the StackDNS zone can be decommissioned. Provide a specific date. Only after his acknowledgement, ask him to delete.
- [ ] Consider enabling DKIM properly (post-migration improvement) — Ben's M365 admin can generate `selector1._domainkey` and `selector2._domainkey` CNAMEs from the Exchange Online admin panel. Add them in Netlify DNS.
- [ ] Consider adding a DMARC policy — start at `p=none` with a `rua=` reporting address for a few weeks to gather data, then escalate to `p=quarantine`. This closes a real spoofing vector.
- [ ] Consider enabling DNSSEC on the Netlify zone — Netlify Domains → the zone → DNSSEC → Enable. Copy the DS record to GoDaddy.

---

## Contacts

| Role | Name | Reach |
|---|---|---|
| Client (primary) | Ben Paine | ben@designerrecruitment.co.uk / mobile |
| Client (backup) | Cara Tomkins | cara@designerrecruitment.co.uk |
| FireFish support | Scott McFarlane | via FireFish support channel |
| Netlify support | — | https://answers.netlify.com (community) or support ticket if on paid plan |
| Domain registrar | GoDaddy | via Ben's GoDaddy login |
| DNS host | StackDNS (admin: David Martin) | Introduced by Ben; send record spec (see Appendix A) |

---

## After launch — small housekeeping items to schedule

- [ ] Remove any hard-coded references to `design-recruitment.netlify.app` from the codebase (search and swap for `designerrecruitment.co.uk`).
- [ ] Revisit the FireFish blocks with Scott every ~6 months to ensure the CSS + HTML haven't drifted from the marketing site's design system.
- [ ] Set a calendar reminder for the domain renewal at GoDaddy (annual).
- [ ] Set a calendar reminder to review analytics + SEO 30 days post-launch.
- [ ] Consider adding structured data for JobPosting on the candidates page (from audit — pending).
- [ ] Consider migrating repeated nav/footer HTML into a proper build step (from audit — deferred).

---

## Appendix A — Netlify DNS migration reference

David has recommended (and we've accepted) migrating authoritative DNS from StackDNS to **Netlify DNS**. This appendix captures the migration plan and the dig-baseline of the current zone as of 4 July 2026 — the source of truth we diff David's export against before rebuilding.

**Reference docs:**
- Netlify DNS setup: <https://docs.netlify.com/domains-https/netlify-dns/dns-quick-start/>
- Netlify DNS supported record types: A, AAAA, ALIAS, CNAME, MX, TXT, SRV, CAA, NS — all confirmed supported as of 2026.

### The four asks for David (already sent — see email chain)

1. **Full zone export** from StackDNS (BIND format, CSV, or comprehensive screenshots).
2. **DKIM selector name(s)** currently active on the zone (the one thing we cannot discover from outside — see baseline below, no standard M365 selectors resolve).
3. **Confirmation that DNSSEC is not active** on the zone. Baseline confirms no DS record at parent — but confirm with David that it's not staged inside StackDNS pending a DS publish.
4. **StackDNS zone preserved and unmodified for 2 weeks post-cutover** as our rollback target.

### DNS baseline — captured via dig on 4 July 2026

Every record present in either David's export OR this baseline must exist in the rebuilt Netlify zone unless we explicitly decide to retire it. If David's export contains records not in this baseline, those are the ones we most need to understand (they may be hidden from public DNS queries).

**Authoritative nameservers (current — to be replaced at Step 6):**

| Name | TTL | Value |
|------|-----|-------|
| `@` | 3600 | `ns1.stackdns.com` |
| `@` | 3600 | `ns2.stackdns.com` |
| `@` | 3600 | `ns3.stackdns.com` |
| `@` | 3600 | `ns4.stackdns.com` |

**SOA:** `ns1.stackdns.com hostmaster.stackdns.com` — minimum TTL 300s (already low; no pre-cutover TTL lower needed for the SOA itself).

**DNSSEC:** No DS record at the `.co.uk` parent zone. DNSSEC is not currently active. Confirmed via `dig DS designerrecruitment.co.uk`.

**Site records:**

| Type | Name | TTL | Value | Notes |
|------|------|-----|-------|-------|
| A | `@` | 3600 | `185.151.30.151` | StackCP hosting for existing WordPress site. Replaced by Netlify ALIAS. |
| AAAA | `@` | 3600 | `2a07:7800::151` | IPv6 for existing site. Netlify's ALIAS resolves to both v4 + v6. |
| A | `www` | 3600 | `185.151.30.151` | Same as apex. Replaced by CNAME to Ben's netlify.app slug. |

**Email records (M365 — must be preserved verbatim):**

| Type | Name | TTL | Value |
|------|------|-----|-------|
| MX | `@` | 3600 | `0 designerrecruitment-co-uk.mail.protection.outlook.com` |
| TXT | `@` | 3600 | `"v=spf1 include:spf.protection.outlook.com include:spf.stackmail.com -all"` |
| CNAME | `autodiscover` | 3600 | `autodiscover.outlook.com` |
| TXT | `_dmarc` | — | **NOT CONFIGURED** (no record present) |
| CNAME/TXT | `*._domainkey` | — | **NO STANDARD M365 SELECTORS RESOLVE** — must confirm with David whether DKIM is (a) not configured or (b) using a custom selector name |

**Jobs subdomain (must be preserved verbatim):**

| Type | Name | TTL | Value |
|------|------|-----|-------|
| CNAME | `jobs` | 3600 | `20163.clients.firefishsoftware.com` (resolves via Azure West Europe to `20.23.61.81`) |

**Wildcard suspicion — StackCP boilerplate subdomains:**

All these currently resolve to `185.151.30.151` (same as apex):

`mail`, `webmail`, `smtp`, `imap`, `pop`, `autoconfig`, `staging`, `dev`, `blog`, `shop`, `portal`, `cpanel`, `admin`, `remote`, `vpn`

This is almost certainly a wildcard A record (`*.designerrecruitment.co.uk`) served by StackCP as a default. Confirm with David whether this is a real wildcard or individual records. In the rebuilt Netlify zone:

- If wildcard: replicate as `*` → the new apex ALIAS (i.e. these subdomains will 404 on the new Netlify site instead of showing the old WordPress). Consider whether this is desired.
- If individual records with a specific purpose (e.g. `mail.` really does host webmail): preserve them exactly.
- Recommend: replicate as wildcard, but audit which subdomains Ben's team actively references (email signatures, docs) and set them up explicitly if they matter.

**FTP:**

| Type | Name | TTL | Value |
|------|------|-----|-------|
| CNAME | `ftp` | — | `ftp.gb.stackcp.com` |

FTP is a StackCP hosting endpoint. Check with Ben whether his team uses this — likely defunct or WordPress-admin only. Can probably drop, but confirm first.

**CAA:** No CAA records currently. Suggest adding `0 issue "letsencrypt.org"` in the Netlify zone so cert renewals are unambiguous.

### Netlify DNS ownership caveats

- **The zone lives under Ben's Netlify account, not flowfortyfour's.** The zone follows the account, not the site — so the account transfer (Step 2) MUST complete before we enable Netlify DNS in Step 3.
- Netlify DNS supports IPv6 (AAAA) natively — the ALIAS at apex resolves to both v4 + v6 load balancer targets automatically. No separate AAAA record needed.
- Netlify does NOT support importing a BIND zone file through the UI — every record is typed manually in the dashboard or scripted via the Netlify API. For a small zone (~10 records) manual entry is fine. If David's export reveals a much larger zone, use the Netlify API.

### TTL strategy

- **48 hours BEFORE cutover:** ask David to lower TTLs on the current StackDNS NS records to 300s so the eventual nameserver switch propagates fast.
- **Cutover day:** every record in the staged Netlify zone starts at TTL 300s. This makes rollback fast if we need it.
- **24 hours AFTER cutover** (once stable): raise Netlify DNS TTLs to 3600 for normal caching.

### Cutover-day handshake

1. Armani confirms Ben's Netlify site is live and healthy at Ben's `.netlify.app` URL.
2. Armani confirms the staged Netlify zone answers correctly on every record when queried against Netlify's NS directly (Step 5 of Execution).
3. Ben logs into GoDaddy and swaps nameservers from `ns1-4.stackdns.com` to Netlify's four `dns1-4.p0X.nsone.net` values (Step 6). David's involvement ends here.
4. Armani watches propagation across resolvers, then verifies email + jobs + site (Steps 7–9).
5. If anything breaks: Ben flips nameservers back to StackDNS at GoDaddy per Rollback Scenario A.

### SSL

Netlify DNS + Netlify hosting = automatic Let's Encrypt SSL. No cert work from David or Ben. Typical issuance: 1–5 minutes after nameserver propagation.
