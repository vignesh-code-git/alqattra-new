# Seeds the users and access levels the Masters and Privileges pages showed
# before they were connected to the database.
from django.db import migrations

STAFF = [
    {
        "name": "sanin",
        "email": "it@alqattara.com",
        "role": "ADMINA",
        "phone": "0564116337",
        "registered_on": "09/04/2026",
        "last_login": "-",
        "last_logout": "-"
    },
    {
        "name": "MAHA RASHED",
        "email": "maha@alqattara.com",
        "role": "ADMINA",
        "phone": "0501234567",
        "registered_on": "17/12/2025",
        "last_login": "08/09/2026, 9:32:06 AM",
        "last_logout": "03/09/2026, 12:02:06 PM"
    },
    {
        "name": "AMIRA",
        "email": "amira@alqattara.com",
        "role": "AAdmin",
        "phone": "0529876543",
        "registered_on": "16/10/2025",
        "last_login": "17/10/2025, 10:18:45 AM",
        "last_logout": "-"
    },
    {
        "name": "MOHAMMED.A",
        "email": "it@alqattara.com",
        "role": "ADMINA",
        "phone": "0554433221",
        "registered_on": "15/07/2025",
        "last_login": "08/09/2026, 8:57:32 AM",
        "last_logout": "27/08/2026, 5:48:43 PM"
    },
    {
        "name": "IRSHAD",
        "email": "store@alqattara.com",
        "role": "STORE KEEPER",
        "phone": "0567788990",
        "registered_on": "13/07/2025",
        "last_login": "08/09/2026, 7:44:33 AM",
        "last_logout": "21/07/2026, 7:24:45 AM"
    },
    {
        "name": "SUDEESH",
        "email": "chemist@alqattara.com",
        "role": "STORE KEEPER",
        "phone": "0543322110",
        "registered_on": "12/07/2025",
        "last_login": "12/07/2025, 5:09:45 PM",
        "last_logout": "-"
    },
    {
        "name": "RABEESH",
        "email": "abudhabi-branch@alqattara.com",
        "role": "AAdmin",
        "phone": "0508877665",
        "registered_on": "12/07/2025",
        "last_login": "08/09/2026, 10:34:38 AM",
        "last_logout": "25/07/2026, 11:02:07 AM"
    },
    {
        "name": "MANAGING DIRECTOR",
        "email": "md@alqattara.com",
        "role": "AAdmin",
        "phone": "0501112233",
        "registered_on": "12/07/2025",
        "last_login": "08/09/2026, 9:48:35 AM",
        "last_logout": "01/09/2026, 11:36:23 AM"
    },
    {
        "name": "Rouda",
        "email": "rouda@alqattara.com",
        "role": "AAdmin",
        "phone": "0501234567",
        "registered_on": "12/07/2025",
        "last_login": "07/09/2026, 10:37:56 AM",
        "last_logout": "07/09/2026, 10:35:27 AM"
    },
    {
        "name": "Cashier",
        "email": "sales@alqattara.com",
        "role": "CASHIER",
        "phone": "0559988776",
        "registered_on": "05/07/2025",
        "last_login": "08/09/2026, 7:31:06 AM",
        "last_logout": "19/08/2026, 8:12:27 AM"
    },
    {
        "name": "ADMIN",
        "email": "admin@alqattara.com",
        "role": "ADMIN",
        "phone": "0500000001",
        "registered_on": "28/02/2025",
        "last_login": "08/09/2026, 8:10:12 AM",
        "last_logout": "07/09/2026, 6:00:00 PM"
    }
]

LEVELS = [
    {
        "class_name": "ADMINA",
        "readonly": "",
        "read_write": "dashboard,utilities,orders,customers,reports,wallet,zones,routes,salesman,masters,privileges,cities,cashier,offer_commission",
        "registered_on": "27/10/2025"
    },
    {
        "class_name": "customercare",
        "readonly": "dashboard,orders,customers,reports,wallet,zones,routes,salesman",
        "read_write": "orders,customers,reports,salesman,cities",
        "registered_on": "20/09/2025"
    },
    {
        "class_name": "test",
        "readonly": "",
        "read_write": "masters,privileges,cashier",
        "registered_on": "14/09/2025"
    },
    {
        "class_name": "CASHIER",
        "readonly": "dashboard",
        "read_write": "orders,customers,reports,salesman,cities,cashier",
        "registered_on": "13/09/2025"
    },
    {
        "class_name": "ADMINISTRATOR",
        "readonly": "utilities,orders,customers,reports,wallet,zones,routes,salesman,cashier",
        "read_write": "cities",
        "registered_on": "15/07/2025"
    },
    {
        "class_name": "STORE KEEPER",
        "readonly": "utilities",
        "read_write": "utilities,cities",
        "registered_on": "15/07/2025"
    },
    {
        "class_name": "AAdmin",
        "readonly": "",
        "read_write": "dashboard,utilities,orders,customers,reports,wallet,zones,routes,salesman,masters,privileges,cities,cashier",
        "registered_on": "15/07/2025"
    },
    {
        "class_name": "ADMIN",
        "readonly": "",
        "read_write": "dashboard,utilities,orders,customers,reports,wallet,zones,routes,salesman,masters,privileges,cities",
        "registered_on": "28/02/2025"
    }
]


def seed(apps, schema_editor):
    StaffUser = apps.get_model("alqattara", "StaffUser")
    AccessLevel = apps.get_model("alqattara", "AccessLevel")
    if not StaffUser.objects.exists():
        StaffUser.objects.bulk_create([StaffUser(**row) for row in STAFF])
    if not AccessLevel.objects.exists():
        AccessLevel.objects.bulk_create([AccessLevel(**row) for row in LEVELS])


def unseed(apps, schema_editor):
    apps.get_model("alqattara", "StaffUser").objects.all().delete()
    apps.get_model("alqattara", "AccessLevel").objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [("alqattara", "0002_accesslevel_staffuser")]
    operations = [migrations.RunPython(seed, unseed)]
