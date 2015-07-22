'use strict';

module.exports = {
    articles: function(pouchDB, dbName, annotationDbName) {
        var db = pouchDB(dbName);

        function list() {
            return db.allDocs({
                    startkey: 'article',
                    endkey: 'article{}',
                    inclusive_end: true,
                    include_docs: true
                })
                .then(function(res) {
                    console.log(res.rows);
                    return res.rows.map(function(r) {
                        return r.doc;
                    });
                });
        }

        function create(article) {
            article.type = 'article';
            article._id = 'article-' + (new Date()).toISOString();
            return db.put(article);
        }

        function dlAnns() {
            var dba = pouchDB(annotationDbName);
            return dba.query('annotator/annotations', {
                include_docs: true
            })
              .then(function(res) {
                console.log(res.rows);
                return res.rows.map(function(r) {
                    return r.doc;
                });

            });
          }


            function get(id) {
                return db.get(id);
            }

            function update(article) {
                return db.put(article);
            }

            function remove(id) {
                return db.get(id).then(function(doc) {
                    return db.remove(doc);
                });
            }

            return Object.freeze({
                list: list,
                create: create,
                get: get,
                update: update,
                remove: remove,
                dlAnns: dlAnns
            });

        }
    };
