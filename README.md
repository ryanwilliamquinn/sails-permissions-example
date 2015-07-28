# reviews

a [Sails](http://sailsjs.org) application




To log in, make a post request to /auth/local, with the body parameters: identifier: the username, password: the password.

The admin user credentials default to admin/admin1234.  See `config/bootstrap.js` for other user credentials.  

The bootstrap file also contains some example roles and permissions.  You can find a full walkthrough of this app [here](http://threeninetyfive.net/blog/2015/07/14/sails-permissions-by-example/).
