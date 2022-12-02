requirejs.config({
  paths: {
    'pouchdb': '../node_modules/@oracle/offline-persistence-toolkit/dist/debug/pouchdb-browser-7.2.2',
    'pouchfind': '../node_modules/@oracle/offline-persistence-toolkit/dist/debug/pouchdb.find',
    'persist': '../node_modules/@oracle/offline-persistence-toolkit/dist/debug'
  }
});
requirejs(["app"]);