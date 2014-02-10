* Change way to load public projects. Load all public projects, not just from current user.
* Disabled 'community mode' so you can now create more than one organizations. Every organization may have its own projects (like as in hosted version).
* Implemented authentication via LDAP with automatic account creation. Also fixed "Forgot your password" to work correctly with users authenticated via LDAP.
* Added LDAP support for invitations. When you invite colleague by username and he's known in LDAP, it will automaticaly create user account for him and send e-mail invitation for log-in.
* Changed default time-zone to Prague and first day of week to monday :-)
* Introduced new role named supervisor and ability to create organizations. You can allow creating new organizations only to supervisors (or every user like as before).
* Option to set organization as default for all new users; every newly signed user will be automatically added to all default organizations as participant (i.e. will be able to create new projects).
* Support for Google Analytics tracking.
