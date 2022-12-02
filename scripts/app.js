define(['persist/persistenceManager', 'persist/persistenceStoreManager', 'persist/defaultResponseProxy', 'persist/pouchDBPersistenceStoreFactory', 'persist/persistenceUtils', 'persist/fetchStrategies'], function (persistenceManager, persistenceStoreManager, defaultResponseProxy, pouchDBPersistenceStoreFactory, persistenceUtils, fetchStrategies) {

  //let productUrl = "https://reqres.in/api/products/";
  let productUrl = "http://localhost:3003/item";
  let productEditUrl = "http://localhost:3003/dummy";
  let userUrl = "https://jsonplaceholder.typicode.com/todos";
  let locationUrl = "http://localhost:3003/location";

  let serverCallback = function(request, response) {
    return Promise.resolve(response);
  };
//{serverResponseCallback: serverCallback}
  persistenceStoreManager.registerDefaultStoreFactory(pouchDBPersistenceStoreFactory);
  //persistenceStoreManager.registerStoreFactory('location', pouchDBPersistenceStoreFactory);
  persistenceManager.init().then(function () {
    persistenceManager.register({
      scope: '/location'
    })
    .then(function (registration) {
      let responseProxy = defaultResponseProxy.getResponseProxy({
        fetchStrategy: fetchStrategies.getCacheFirstStrategy()
      });
      let fetchListener = responseProxy.getFetchEventListener();
      //registration.addEventListener('fetch', fetchListener);
      registration.addEventListener('fetch', function (event) {
        event.respondWith(new Promise(function (resolve, reject) {
          responseProxy.processRequest(event.request).then(function (response) {
            if (response != null) {
              // Check to see if the response from the cache is stale
              console.log(response.headers.get('x-oracle-jscpt-cache-expiration-date'));
              if ((new Date(response.headers.get('x-oracle-jscpt-cache-expiration-date'))).getTime() < (new Date()).getTime()) {
                // handle response
                console.log("handle response");
              } else {
                // handle stale response
                console.log("handle stale response");
              }
            }
            resolve(response);
          });
        }));
      });
    });

    persistenceManager.register({
      scope: '/item'
    })
    .then(function (registration) {
      let responseProxy = defaultResponseProxy.getResponseProxy();
      let fetchListener = responseProxy.getFetchEventListener();
      registration.addEventListener('fetch', fetchListener);
    });

    persistenceManager.register({
      scope: '/dummy'
    })
    .then(function (registration) {
      let responseProxy = defaultResponseProxy.getResponseProxy();
      let fetchListener = responseProxy.getFetchEventListener();
      registration.addEventListener('fetch', fetchListener);
    });
  });

  let userButton = document.getElementById('user');
  userButton.addEventListener('click', ev => {
    fetch(locationUrl)
    .then(response => {
      console.log(persistenceUtils.isCachedResponse(response));
      return response.json()
    })
    .then(data => console.log(data));
  });

  let productsButton = document.getElementById('products');
  productsButton.addEventListener('click', ev => {
    fetch(productUrl)
    .then(response => response.json())
    .then(data => console.log(data));
  });

  let getLogButton = document.getElementById('getLog');
  getLogButton.addEventListener('click', ev => {
    persistenceManager.getSyncManager().getSyncLog().then(value => {
      console.log(value);
    })
  });

  let syncButton = document.getElementById('sync');
  syncButton.addEventListener('click', ev => {
    persistenceManager.getSyncManager().sync().then(value => {
      console.log(value);
    })
  });

  const postData = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ID": 1,
      "NAME": "First Name",
      "EMAIL": "email@email.com",
      "PHONE_NUMBER": "123-456-789",
      "revNum": 0
    })
  };

  let editButton = document.getElementById('edit');
  editButton.addEventListener('click', ev => {
    fetch(locationUrl, postData)
    .then(response => {
      return response.json()
    })
    .then(data => console.log(data));
  });

});