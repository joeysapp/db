# db
Attempt at organizing/cataloging various things (files, notes, todos, etc.) with the added benefit of having to manage SQL for once

## Architecture
```
--- Master tables
Log          (Tracking, vacations, etc.)


--- Master tables OR should it just be a
--- single table where Notes/Budget/Reminder/Projects are other tables..

Notes        (Scratch, ...)
Budget       (Monthly, wishlists)

Projects     (Axi, Woodworking, Golf?)
Favorites    (Bookmarks, clothing, beer)

Schedule     (Plans, repeated chores, ...)

--- Fundamental Types
Content
Tags


--- Need to think about the below more
(OC)
...Text
...Photos
...Videos
...PDFs
(Raw filetypes)
...Data/Symlink (File symlinks/pointers?)
......Data.Applications
......Data.
......Data.Queue.Users
......Data.Axi.OC
(Third Party? Idk?)
...Data.LastFM.Scrobbles
...Data.Spotify.API
...Data.OSM.Nodes



```
The above basic tables all are populated with what I call `Entry` types for now, but really is just the schema of each of these tables.

## "Entry"
```
id            (PK)
created-at    (Timestamp)

content-id    (FK)
tag-id        (FK)
..
location-id   (FK)
user-id       (FK)
```

Here is an example of what could be entered into the Notes table.
```
Notes
    id        created-at      content-id     tag-id
    ------------------------------------------------
    33        2022-10-21      23             32

Content
    id        fk-id     table
    ------------------------------------------------
    23        9         text... notes...
    -         -         -
    29        8         data
    29        22        notes
    29        99        videos vs data
    29        100       videos vs data

Tags
    id        text
    ------------------------------------------------
    32        instructional
    32        progress
    32        hsv(80, 200%, 200%)
    32        attempt-2
    
```



# Past Research
I looked into C's H2O and Mongo - for now I'm going with Postgres, and a Node interface.

## h2o
[https://h2o.examp1e.net/configure/quick_start.html](quick start)
==> Pouring h2o--2.2.6_1.monterey.bottle.1.tar.gz

```
Examples:
/usr/local/etc/h2o (basic)
/usr/local/etc/h2o/h2o.conf
/usr/local/opt/h2o/share/h2o/examples (bigger)
/usr/local/opt/h2o/share/h2o/examples/h2o/h2o.conf (about config files)
/usr/local/opt/h2o/share/h2o/examples/h2olib/ (about the actual c lib)

To restart h2o after an upgrade:
  brew services restart h2o
  
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/h2o/bin/h2o -c /usr/local/etc/h2o/h2o.conf
  
==> Summary
🍺  /usr/local/Cellar/h2o/2.2.6_1: 126 files, 4.9MB
```

## mongo
I hear mongo can be unreliable.
https://www.npmjs.com/package/mongodb
https://github.com/mongodb/node-mongodb-native
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
https://www.mongodb.com/docs/mongodb-shell/crud/read/#std-label-mongosh-read

```
$ mongod --dbpath=../../../data/muh_table
$ ...

; want to shut it down
$ mongosh
$ db.activateCommand({ shutdown: 1 })
```

Insert to table:
```
db.foobar.insertOne({ thing: 'stuff', uuid: 'fred-uuid-0003' })
db.foobar.insertMany([ ... ])
```

Find an entry:
```
db.foobar.find()
db.foobar.find({ uuid: 'steve-uuid-0001' });

db.movies.find( { rated: { $in: [ "PG", "PG-13" ] } } )
; equivalent to
; SELECT * FROM movies WHERE rated in ("PG", "PG-13")
```
