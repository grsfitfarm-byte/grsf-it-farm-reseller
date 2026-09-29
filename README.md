# GRSF IT FARM — Reseller Portal v1

This is a first-version demo portal with:

- Admin login
- Reseller login
- Admin offer management
- Promo codes
- Deposit + bonus calculation
- Active/inactive/expired offers
- Reseller dashboard
- Reseller transaction view
- Responsive mobile layout

## Demo login

Admin:
- Username: `admin`
- Password: `admin123`

Reseller:
- ID: `RS001`
- Password: `123456`

## Run

Option 1: Open `index.html` directly in a browser.

Option 2: Recommended local server:

```bash
python -m http.server 8000
```

Then open:
`http://localhost:8000`

## Important production note

This v1 is a frontend prototype. Authentication and data are stored in browser `localStorage`. Do NOT use the demo passwords or localStorage-only authentication for a live financial/reseller system.

For production, add:
- HTTPS
- Real server-side authentication
- Password hashing
- Database (MySQL/PostgreSQL)
- Admin roles/permissions
- Server-side validation
- Audit logs
- Backup
- Secure session/JWT handling
- Payment/deposit verification before awarding bonus
- Promo-code usage rules and expiry
