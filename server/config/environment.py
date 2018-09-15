ENVIRONMENT = 'dev'
# ENVIRONMENT = 'prod'

SETTINGS_MODULE = 'config.settings.dev'

if ENVIRONMENT == 'prod':
    SETTINGS_MODULE = 'config.settings.prod'
