# 🚀 Al Qattara CRM - Deployment Guide (Render + Vercel)

This guide shows how to deploy the **Django Backend to Render** and the **Next.js Frontend to Vercel** while keeping all your existing PostgreSQL database records safe and secure.

---

## 🔒 1. Keeping Your Existing PostgreSQL Data Safe

Your existing database contains 27 tables (customers, orders, invoices, products, salesmen, trucks, routes, wallets, etc.).
We have already created two independent, portable backups inside `/backend`:

1. **`backend/database_backup_alqattara.sql`**: Full PostgreSQL native dump with all tables, sequences, and relationships.
2. **`backend/database_data.json`**: Portable Django JSON data fixture.

### How to Restore Your Data into Render PostgreSQL (or Neon/Supabase):
When you create a PostgreSQL instance on Render, copy its **External Database URL** and restore your backup:

```bash
# Option A: Restore using psql with your Render/cloud connection string
psql "postgresql://user:password@host/dbname" < backend/database_backup_alqattara.sql

# Option B: Restore using Django fixture in Render Shell
python manage.py loaddata database_data.json
```

---

## ⚙️ 2. Backend Deployment on Render

### Method 1: Automatic Blueprint (Recommended)
1. Push this repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Blueprint**.
3. Select the `alqattra-new` repository.
4. Render will automatically detect `render.yaml` and provision:
   - A Web Service (`alqattara-crm-backend`)
   - A Managed PostgreSQL Database (`alqattara-crm-postgres`)
5. Click **Apply**.

### Method 2: Manual Web Service on Render
1. Click **New +** -> **Web Service** -> Link `vignesh-code-git/alqattra-new`.
2. Configure settings:
   - **Name:** `alqattara-crm-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Python`
   - **Build Command:** `./build.sh` *(or `pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate`)*
   - **Start Command:** `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2`
3. Add Environment Variables under **Environment**:
   | Variable | Value |
   |---|---|
   | `PYTHON_VERSION` | `3.11.9` |
   | `DJANGO_SETTINGS_MODULE` | `config.settings.production` |
   | `SECRET_KEY` | *(Generate a random secret key)* |
   | `DEBUG` | `false` |
   | `DATABASE_URL` | *(Your Render PostgreSQL connection string)* |
   | `DB_SSL_REQUIRE` | `true` |
   | `ALLOWED_HOSTS` | `.onrender.com,localhost,127.0.0.1` |
   | `CORS_ALLOW_ALL_ORIGINS` | `true` |
   | `CORS_ALLOWED_ORIGINS` | `https://your-frontend.vercel.app,http://localhost:3000` |

---

## 🌐 3. Frontend Deployment on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/) and click **Add New...** -> **Project**.
2. Select your repository `vignesh-code-git/alqattra-new`.
3. In **Project Settings**:
   - **Root Directory:** Click `Edit` and select **`frontend`**.
   - **Framework Preset:** `Next.js` (detected automatically).
4. In **Environment Variables**, add:
   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | `https://your-backend-name.onrender.com/api` |
5. Click **Deploy**.

---

## 🔄 4. Easy URL Reuse & Switching

- **To update Backend URL in Frontend:**
  Simply change `NEXT_PUBLIC_API_URL` in Vercel under *Settings -> Environment Variables* and trigger a Redeploy.
  The frontend API helper automatically strips trailing slashes to prevent formatting errors.
- **To update Allowed Origins in Backend:**
  Simply add your new frontend domain to `CORS_ALLOWED_ORIGINS` or leave `CORS_ALLOW_ALL_ORIGINS=true` in Render.
