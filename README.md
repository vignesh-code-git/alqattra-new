# Al Qattara Pure Drinking Water CRM & ERP Platform

A comprehensive Water Delivery CRM, ERP, and Route Sales Management system built accurately from the Figma design specifications.

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router, JavaScript), Tailwind CSS, Lucide React, Chart.js & React-Chartjs-2
- **Backend:** Python 3.12, Django 6, Django REST Framework, SimpleJWT, PostgreSQL (`psycopg2-binary`)
- **Database:** PostgreSQL (with SQLite development fallback out-of-the-box)

---

## 📁 Project Architecture (`C:\Users\HP\Desktop\alqattara-crm`)

```text
alqattara-crm/
├── backend/
│   ├── env/                                # Python Virtual Environment
│   ├── manage.py                           # Management entrypoint
│   ├── seed_data.py                        # Pre-populates all Figma metrics & data
│   ├── config/
│   │   ├── settings/
│   │   │   ├── base.py                     # Common settings (CORS, JWT, REST Framework)
│   │   │   ├── development.py              # Development settings & DB routing
│   │   │   └── production.py               # Production settings
│   │   ├── urls.py                         # Admin & API routing
│   │   └── api_urls.py                     # REST endpoints
│   └── app/
│       ├── alqattara/                      # Core CRM: Orders, Invoices, Cashier, Products, Inventory, Wallets, Zones, Routes
│       ├── salesman/                       # Salesmen, Trucks, Stock Transactions, Commissions
│       └── customers/                      # Customers, Credit Limits, Customer Statements
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (crm)/
│   │   │   │   ├── dashboard/page.js       # Figma KPI cards, Revenue/Collection Donut charts, Top Products, Sales trend
│   │   │   │   ├── utilities/page.js       # Store Inventory, Stock In/Out, Stock Balances
│   │   │   │   ├── orders/page.js          # Orders list, Order Summary, New Order creation
│   │   │   │   ├── invoices/page.js        # Invoices, VAT 5%, Print & Tax Invoicing
│   │   │   │   ├── customers/page.js       # Customers, Customer Details drawer, Type & City filters
│   │   │   │   ├── cashier/page.js         # Daily Collections, Cashier receipts, Driver settlements
│   │   │   │   ├── wallet/page.js          # Customer Wallets, Points & Recharging
│   │   │   │   ├── zones/page.js           # Delivery Zones & Emirate setup
│   │   │   │   ├── routes/page.js          # Routes & Driver/Truck assignments
│   │   │   │   ├── salesman/page.js        # Salesmen & Driver management
│   │   │   │   ├── reports/page.js         # Salesman, Customer, Truck & Commission reports
│   │   │   │   ├── masters/page.js         # Master Data Lookups
│   │   │   │   └── privileges/page.js      # Role-Based Access Control
│   │   │   └── login/page.js               # Al Qattara Authentication
│   │   ├── components/
│   │   │   ├── Sidebar.js                  # Complete navigation matching Figma + City Switcher
│   │   │   └── Header.js                   # Breadcrumbs, Filters button, Profile
│   │   └── services/
│   │       └── api.js                      # Django REST API connector
├── start_backend.bat                       # One-click start Django backend (Port 8000)
└── start_frontend.bat                      # One-click start Next.js frontend (Port 3000)
```

---

## 🚀 How to Run

### 1. Start Backend (Port 8000)
Double-click `start_backend.bat` or run:
```bash
cd backend
env\Scripts\activate
python manage.py runserver 0.0.0.0:8000
```
Backend API will be live at: `http://127.0.0.1:8000/api/`  
Django Admin: `http://127.0.0.1:8000/admin/`

### 2. Start Frontend (Port 3000)
Double-click `start_frontend.bat` or run:
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Credentials

- **Admin Account:** `admin` / `admin123`
- **Email:** `admin@alqattara.ae`

---

## 🗄 PostgreSQL Configuration

In `backend/.env`:
```ini
USE_POSTGRES=True
DB_NAME=alqattara_crm
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
```
Once your password is set in `.env`, run:
```bash
python manage.py migrate
python seed_data.py
```
*(When `USE_POSTGRES=False`, the system automatically runs on SQLite with full seed data populated).*
