# Bot Studio, portfolio

Landing stranica za izradu Discord i Telegram botova. Next.js 16, Tailwind 4, bez baze.
Glavni element su ASCII anime oči u vrhu stranice: crtaju se uživo na canvasu, trepću, prate kursor
(na telefonu same šetaju pogledom), a klik na oko ih natera da trepnu.

## Pokretanje

```bash
npm install
npm run dev
```

Sajt je na http://localhost:3000.

Produkcijski build (cela stranica je statična):

```bash
npm run build
```

## Šta gde stoji

| Putanja | Šta je |
| --- | --- |
| `src/content/site.ts` | sav tekst na sajtu: ime studija, email, naslovi, brojke, projekti, koraci, kontakt |
| `src/lib/ascii-eyes/` | ASCII oči: `engine.ts` crta i animira, `meta.ts` čuva položaj kapaka i zenica |
| `public/eyes.webp` | obrađena slika očiju (siva, zamućena, pojačan kontrast) iz koje se pravi ASCII |
| `public/projects/` | screenshotovi i prateće slike za projekte |
| `src/components/` | sekcije stranice (hero, brojke, radovi sa demom, proces, tehnologije, kontakt) |
| `src/app/globals.css` | boje za tamnu i svetlu temu, animacije |

## Pre objavljivanja

1. **Email**: u `src/content/site.ts` zameni `contact@example.com` pravom adresom.
2. **Forma**: napravi besplatan nalog na [formspree.io](https://formspree.io), napravi formu i
   ID forme upiši u fajl `.env.local`:
   ```
   NEXT_PUBLIC_FORMSPREE_ID=abcdwxyz
   ```
   Bez toga forma otvara posetiočev email program sa već popunjenom porukom.
3. **Adresa sajta**: `url` u `src/content/site.ts` postavi na pravi domen (za deljenje linka na mrežama).
4. **Screenshotovi projekata**: ubaci slike u `public/projects/` i u `src/content/site.ts` dodaj `screenshot: "/projects/ime-slike.png"` za željene projekte.
5. **Brojke** (450K+, 99.98%, <350ms, 100%) su preuzete sa produkcijskih metrika.
6. **Tehnologije**: logoi u `src/components/stack.tsx` odgovaraju korišćenom steku (Python, Node.js, Docker, SQLite, itd.).

## Objavljivanje

Najlakše je na [Vercel](https://vercel.com): poveži GitHub repozitorijum i svaki push se sam objavi.
