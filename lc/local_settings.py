# This file is exec'd from settings.py, so it has access to and can
# modify all the variables in settings.py.

# If this file is changed in development, the development server will
# have to be manually restarted because changes will not be noticed
# immediately.

DEBUG = False

# Make these unique, and don't share it with anybody.
SECRET_KEY = ")=98qcwj$0t1hhnxouj3lu$xq(q4u41d5+!t-!(8v#au(eu8cq"
NEVERCACHE_KEY = "4(*ap4$an4!+tj)m952z_utt2=ksjg^rfxo+-xl57s(snl9zrx"

DATABASES = {
    "default": {
        # Ends with "postgresql_psycopg2", "mysql", "sqlite3" or "oracle".
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        # DB name or path to database file if using sqlite3.
        "NAME": "lc",
        # Not used with sqlite3.
        "USER": "lc",
        # Not used with sqlite3.
        "PASSWORD": "lc",
        # Set to empty string for localhost. Not used with sqlite3.
        "HOST": "localhost",
        # Set to empty string for default. Not used with sqlite3.
        "PORT": "",
    }
}

###################
# DEPLOY SETTINGS #
###################

# Domains for public site
ALLOWED_HOSTS = ["104.131.158.208"]

# These settings are used by the default fabfile.py provided.
# Check fabfile.py for defaults.

FABRIC = {
     "DEPLOY_TOOL": "git",  # Deploy with "git", "hg", or "rsync"
     "SSH_USER": "lc",  # VPS SSH username
     "HOSTS": ["104.131.158.208"],  # The IP address of your VPS
     "DOMAINS": ALLOWED_HOSTS,  # Edit domains in ALLOWED_HOSTS
     "REQUIREMENTS_PATH": "requirements.txt",  # Project's pip requirements
     "LOCALE": "en_US.UTF-8",  # Should end with ".UTF-8"
     "DB_PASS": "lc",  # Live database password
     "ADMIN_PASS": "admin",  # Live admin user password
     "SECRET_KEY": SECRET_KEY,
     "NEVERCACHE_KEY": NEVERCACHE_KEY,
}
