# AlQattara Salesman — React Native app

Mobile van-sales app for AlQattara Pure Drinking Water, built to match the
screens in the Figma file and wired to the existing Django CRM backend at
`../backend`.

- **Expo SDK 58**, React Native 0.88, React 19.3 — JavaScript, not TypeScript
- **Expo Router** for navigation, routes in `src/app/`
- No local Android Studio needed: run it on a phone with Expo Go

---

## Design language

The UI follows iOS conventions on both platforms, so the Android build looks
like an iPhone app rather than a Material one:

- Apple's system palette (`systemBlue`, grouped grey background, label /
  secondary-label greys, hairline separators) — see `src/theme/index.js`
- Large Title headers on tab screens; a 44pt bar with a blue chevron and
  "Back" on pushed screens
- Flat inset-grouped cards and Settings-style rows instead of elevated cards
- Tab bar with filled glyphs and 10pt labels
- Quick Actions drawn as Apple-style app icons: gradient rounded squares with the
  label underneath
- Segmented controls, iOS search
  fields, sheets with a grabber and "Done", filled and tinted buttons
- Ionicons throughout, and the iOS slide-over push transition on Android

One thing cannot be matched on Android: the typeface. An iPhone renders the
app in San Francisco; Android falls back to Roboto, because SF cannot be
bundled into an Android build.

---

## Running it

### 1. Start the Django backend

```bash
cd ../backend && env/Scripts/python.exe manage.py runserver 0.0.0.0:8000
```

`0.0.0.0` matters — binding to `127.0.0.1` makes the server unreachable from
your phone. The app's default host detection assumes Django is on the same
machine as the Metro bundler.

### 2. Start the app

```bash
npx expo start
```

Scan the QR code with Expo Go on your Android phone, both on the same Wi-Fi.

### Connection to the CRM website

The app and the CRM website (`../frontend`) talk to the **same
Django backend and database**, so a customer or order saved in one is stored
for both. Checked 2026-11-13: a customer created in the app was saved by the
shared backend (`201 Created`).

The website's **Customers** and **Orders** pages read and write the backend
live (since 2026-11-13). They re-sync every 15 seconds and whenever the tab
regains focus, so a customer or order saved in the app appears on the
website on its own, and website edits reach the app the same way. Verified
end to end: an app-created customer and order each appeared on the open
website without a reload. The website pieces are:

- `frontend/src/hooks/useLiveData.js` - load, poll, refresh-on-focus
- `frontend/src/services/crmMappers.js` - API records <-> page shapes

Since then every other operational page reads and writes the backend the
same way: Wallet, Cashier, Invoices, Salesman, Zones, Routes and Utilities.
The one exception is **Masters**, which on the website is an employee list -
the backend has no employee records, so it still shows demo data.

Wallet recharges go through `POST /api/crm/wallet-recharges/` (added
2026-11-13). The server credits the wallet and writes the matching cashier
transaction in one database transaction. The app's Select Offer >
Confirm Recharge and the website's Wallet Recharge form both use it, so a
recharge made on either side shows on the other's Wallet and Cashier pages.

The Render backend the website's deployment config names
(`alqattara-crm-backend.onrender.com`) is not deployed yet (404).

### Pointing at a different backend

The app works out the API host from the Expo bundler address, so it usually
needs no configuration. To override:

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.19:8000 npx expo start
```

### Other commands

```bash
npx expo start --web
```

```bash
npx expo export --platform android
```

---

## Project layout

```text
src/
├── app/                      Expo Router routes (every file is a screen)
│   ├── _layout.js            root Stack, headers off (screens draw their own)
│   ├── (tabs)/
│   │   ├── _layout.js        tab bar: Home, New Sale, Orders, New Customer
│   │   ├── index.js          Salesman Dashboard
│   │   ├── new-sale.js       pick customer, add products, submit order
│   │   ├── orders.js         Assigned / Completed orders with search
│   │   └── add-customer.js   New Customer form
│   ├── select-customer.js    customer picker for New Sale, zone filter
│   ├── daily-customers.js    today's route: Directions / Call / SMS
│   ├── credit-orders.js      credit orders, zone filter, expandable cards
│   ├── customer-assets.js    "Update Customer" assets overview
│   ├── customer-wallet.js    wallet balance + recharge history
│   ├── add-assistant.js      "Select Assistant" multi-select
│   └── damaged-items.js      truck info, per-product stock, report damage
├── components/               AppHeader, Card, StatTile, QuickActionTile, IconBadge,
│                             SelectSheet, SearchBar, SegmentedControl, Button,
│                             FormRow, Notice, StateView
├── lib/
│   ├── api.js                Django REST client + host detection
│   ├── session.js            current salesman and truck
│   ├── store.js              shared state, some kept on the device
│   ├── useAsync.js           fetch / reload / pull-to-refresh hook
│   └── format.js             AED currency and date helpers
└── theme/index.js            colours, spacing, radius, typography
```

---

## API mapping

| Screen | Endpoints |
| --- | --- |
| Dashboard | `/api/salesman/salesmen/`, `/api/salesman/trucks/`, `/api/crm/products/`, `/api/crm/orders/`, `/api/crm/cashier/` |
| New Sale | reads `/api/crm/products/`, `/api/crm/orders/`; **writes** `POST /api/crm/orders/` |
| Select Customer | `/api/customers/list/` |
| Orders | `/api/crm/orders/`, `/api/crm/invoices/`, `/api/customers/list/` |
| New Customer | reads `/api/crm/zones/`, `/api/crm/products/`; **writes** `POST /api/customers/list/` |
| Daily Customers | `/api/customers/list/`, `/api/crm/orders/` |
| Credit Orders | `/api/crm/orders/`, `/api/customers/list/`, `/api/crm/zones/` |
| Customer Wallet | `/api/crm/wallets/` (recharges come nested) |
| Customer Assets | `/api/customers/list/`, `/api/crm/products/` |
| Select Assistant | `/api/salesman/salesmen/` (selection kept on the device) |
| Damaged Items | `/api/salesman/salesmen/`, `/api/crm/products/`, `/api/crm/orders/` (reports kept on the device) |

There is no login in the designs and the API is open, so the app acts as the
first salesman the CRM returns (`src/lib/session.js`).

DRF runs with `DEFAULT_PERMISSION_CLASSES = AllowAny`, so reads work without a
token today. `setAuthToken()` in `src/lib/api.js` is ready for when that is
tightened; `/api/auth/token/` issues the JWT.

---

## Backend gaps

Several things in the designs have no model in the CRM, so those screens show
zeroes or a notice rather than inventing data:

| Missing | Needed for |
| --- | --- |
| `CustomerAsset` (on rent / sold / custody / returned / deposit) | Customer Assets — counts read zero |
| Writable order line items (`items` is read-only on the serializer) | New Sale — the order header saves; line items go into `notes` |
| Wallet recharge endpoint | Recharge Wallet button — explains it is unavailable |
| `DamagedItem` | Damaged Items — reports are kept on the phone only |
| `Assistant` | Select Assistant — selection is kept on the phone only |
| Security-deposit payment type on `CashierTransaction` | Collection Details row reads zero |
| `Lend` / `Type` fields on `OrderItem` | Order line items show quantity and price only |
| Per-customer product prices | New Customer "Product Prices" shows standard prices |
| IR number and invoice printing | Orders buttons show a "not set up" alert |
| Per-salesman daily summary endpoint | Dashboard totals, currently computed client-side |

The dashboard works around the last one by aggregating today's orders and
cashier transactions in the app. If no rows match today it falls back to the
most recent records so the screen is not blank.

---

## Building installable apps

Builds run on Expo's cloud (EAS), so no Android Studio and no Mac are needed.
`eas.json` is already configured.

```bash
npm install --global eas-cli
```

```bash
eas login
```

### Android APK

The `preview` profile sets `android.buildType: "apk"`, because EAS defaults to
an AAB, which cannot be installed directly on a device.

```bash
eas build -p android --profile preview
```

The finished APK comes back as a download link. Install it by opening that link
on the phone, or over USB:

```bash
adb install path/to/app.apk
```

For the Play Store, use the `production` profile instead — that produces an AAB.
A Play Developer account costs $25 once.

### iOS

The build itself runs on Expo's macOS workers, so Windows is fine. Apple's
signing rules are the constraint, not the machine:

| Target | Needs |
| --- | --- |
| Simulator build (`preview-sim`) | No Apple membership — but the simulator only runs on a Mac |
| Real iPhone (ad hoc) | Paid Apple Developer Program, $99/yr. Max 100 devices/year |
| App Store | Paid Apple Developer Program, $99/yr |

For a real device, register it first, then build:

```bash
eas device:create
```

```bash
eas build -p ios --profile preview
```

### Notes

- Local builds (`eas build --local`) are **not supported on Windows** — macOS
  and Linux only. Cloud builds are the practical route here.
- Set `EXPO_PUBLIC_API_URL` to a reachable backend before building. A build
  pointing at a LAN address only works on that network.

---

## Design source

The full-resolution frames are in `mobile-crm/`. Screen layouts follow those
frames element for element (cards, field labels above inputs, underline tabs,
filled action buttons); colours, type, icons, sheets and the tab bar stay in the
iOS style. Where the CRM cannot back a button, tapping it shows an alert
instead of an on-screen notice, so the screens stay as designed.

All 23 frames in the Figma file are covered. The frames are flattened phone
screenshots (no layers or variables), so content and flows were read from the
images and rebuilt in the iOS design language above. Three sections of the New
Customer form — Business Information, Additional Details, Product Prices — are
collapsed in every frame, so their fields are taken from the CRM's customer
model rather than from the design.
