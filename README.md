# Crewmate

[![Build Status](https://travis-ci.org/crewmate/crewmate.png?branch=master)](https://travis-ci.org/crewmate/crewmate) [![Code Climate](https://codeclimate.com/github/crewmate/crewmate.png)](https://codeclimate.com/github/crewmate/crewmate) [![Code Coverage](https://codeclimate.com/github/crewmate/crewmate/coverage.png)](https://codeclimate.com/github/crewmate/crewmate) [![Dependency Status](https://gemnasium.com/crewmate/crewmate.png)](https://gemnasium.com/crewmate/crewmate) [![Stories in Ready](https://badge.waffle.io/crewmate/crewmate.png?label=Ready)](http://waffle.io/crewmate/crewmate)

Crewmate is a project management software, a community fork of [Teambox v3](https://github.com/teambox/teambox), built on Ruby on Rails with a focus on collaboration.

Crewmate workflow is project-centered; each project being visible only to people invited to it.
Projects have a status wall, conversations, tasks, shared pages and file uploads.
You can even post to everywhere just using email.

Crewmate is open-source software, meaning you can also download it, change its code and host yourself.

Project info
------------

- Code repository: <http://github.com/crewmate/crewmate>
- End user guide: <http://guide.teambox.com>
- Open-source contributors: <http://github.com/crewmate/crewmate/contributors>
- License: [GNU Affero GPL 3](https://github.com/crewmate/crewmate/blob/master/LICENSE)

Installation
------------

Hop to [our wiki](http://wiki.github.com/crewmate/crewmate/ "Crewmate wiki") to get detailed information on
installing Crewmate.

Contributing
------------

Follow our [contributor guide](https://github.com/crewmate/crewmate/wiki/Contributing) on our github wiki.

Thanks to the many Ruby projects we're using and the Famfamfam icon collection.

Community
---------

Join us in our IRC channel (#crewmate on Freenode) to discuss the project.


What's new in this fork?
------------------------

### Features
- Disabled 'community mode' so you can now create more than one organizations. Every organization may have its own projects (like as in hosted version).
- Implemented authentication via LDAP with automatic account creation. Also fixed "Forgot your password" to work correctly with users authenticated via LDAP.
- Added LDAP support for invitations. When you invite colleague by username and he's known in LDAP, it will automaticaly create user account for him and send e-mail invitation for log-in.
- Changed default time-zone to Prague and first day of week to monday :-)
- Introduced new role named supervisor and ability to create organizations. You can allow creating new organizations only to supervisors (or every user like as before).
- Option to set organization as default for all new users; every newly signed user will be automatically added to all default organizations as participant (i.e. will be able to create new projects).
- Support for Google Analytics tracking.

### Bug fixies 
- Used [fixed](https://github.com/davidmm/immortal) gem Immortal that works correctly with PostgreSQL etc.
- Fixed OAuth authentication controller for Google (see [this page](https://teambox.com/projects/teambox/conversations/76950)).
- Fixed broken processing of incoming e-mail attachments and multipart messages (thanks to [mrtorrent](https://github.com/mrtorrent/teambox/commit/74d9204b1fa0d5f18180b09f8d6d19ce49a16d7f) for the first part). Added filter that removes attachments of unwanted MIME type. That's for removing S/MIME signature files which are useless in Teambox.
- Fixed issue with incoming e-mails that contains non-ASCII compatible characters (e.g. Czech diacritic). This charset problem was even with text/plain in UTF-8! Successfully tested: ordinary text/plain email, multipart emails - S/MIME signed, with inline picture, with any attachments and all combinations. I suppose that every e-mail has at least one text/plain part, HTML-only emails doesn't work.
