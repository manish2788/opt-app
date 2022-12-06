define(['persist/persistenceManager', 'persist/persistenceStoreManager', 'persist/defaultResponseProxy', 'persist/pouchDBPersistenceStoreFactory', 'persist/persistenceUtils', 'persist/fetchStrategies', 'persist/oracleRestJsonShredding'], function (persistenceManager, persistenceStoreManager, defaultResponseProxy, pouchDBPersistenceStoreFactory, persistenceUtils, fetchStrategies, OracleRestJsonShredding) {

  let userUrl = "https://jsonplaceholder.typicode.com/todos";
  persistenceStoreManager.registerDefaultStoreFactory(pouchDBPersistenceStoreFactory);
  persistenceManager.init().then(function () {
    persistenceManager.register({
      scope: '/todos'
    })
    .then(function (registration) {
      let responseProxy = defaultResponseProxy.getResponseProxy({
        jsonProcessor:
          {
              shredder: OracleRestJsonShredding.getShredder('todos'),
              unshredder:  OracleRestJsonShredding.getUnshredder()
          }
      });
      let fetchListener = responseProxy.getFetchEventListener();
      registration.addEventListener('fetch', fetchListener);;
    });
  });

  let userButton = document.getElementById('user');
  let responseTable = document.getElementById('response');

  let viewDBButton = document.getElementById('viewDB');
  let dbDetail = document.getElementById('db-detail');

  userButton.addEventListener('click', ev => {
    fetch(userUrl)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      Object.keys(data).forEach(item => {
        let template = `<tr><td>${data[item].id}</td><td>${data[item].title}</td></tr>`;
        responseTable.insertAdjacentHTML("beforeEnd", template);
      })
    });
  });

  viewDB.addEventListener('click', ev => {
    const promise = window.indexedDB.databases()
    promise.then((databases) => {
      console.log(databases);
      Object.keys(databases).forEach(item => {
        let template = `<li>${databases[item].name}</li>`;
        dbDetail.insertAdjacentHTML("beforeEnd", template);
      });
    })
  });
});