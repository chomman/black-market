black-market
============

Node.js based simple file sharing app.

Install
-------

```
$ git clone git@github.com:noraesae/black-market.git
$ cd black-market
$ npm install
$ ./make-bin
```

And add `bin` directory to your `$PATH` or create a symlink of `bin/black-market` in `$PATH`.

How to Use
----------

Run `black-market` in a directory that you want to share, or just run the `market.js` script with the path argv.

```
$ cd /path/to/share
$ black-market
```

```
$ node market.js /path/to/share
```

License
-------

MIT
