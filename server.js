const express = require('express')
const app = express()
const port = 3003

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Request-ID, x-oracle-jscpt-sync-replay");
  res.header("Access-Control-Expose-Headers", "Oracle-Mobile-Sync-Resource-Type, ETag");
  res.header('Cache-Control', 'max-age=10');
  next();
});

app.get('/location', (req, res) => {
  const inventoryData = [
    {
        "ID": "L10",
    	"NAME": "Main Store",
    	"EMAIL": "main.store@hello.com",
    	"PHONE_NUMBER": "1-800-123-4567",
        "revNum": 0
    },
    {
        "ID": "L20",
    	"NAME": "Second Store",
    	"EMAIL": "second.store@hello.com",
    	"PHONE_NUMBER": "1-800-456-7890",
        "revNum": 0
    },
    {
        "ID": "L50",
        "NAME": "Warehouse",
        "EMAIL": "warehouse@hello.com",
        "PHONE_NUMBER": "1-800-000-0000",
        "revNum": "0"
    }
  ];
  res.send(inventoryData)
});

app.post('/location', (req, res) => {
  const inventoryData = [
    {
        "ID": "L10",
    	"NAME": "Main Store1",
    	"EMAIL": "main.store@hello.com",
    	"PHONE_NUMBER": "1-800-123-4567",
        "revNum": 0
    },
    {
        "ID": "L20",
    	"NAME": "Second Store1",
    	"EMAIL": "second.store@hello.com",
    	"PHONE_NUMBER": "1-800-456-7890",
        "revNum": 0
    },
    {
        "ID": "L50",
        "NAME": "Warehouse",
        "EMAIL": "warehouse@hello.com",
        "PHONE_NUMBER": "1-800-000-0000",
        "revNum": "0"
    }
  ];
  res.send(inventoryData)
})

app.get('/item', (req, res) => {
  const inventoryItems = [{
    "ID": 101,
    "INVENTORY_ID": "L50",
    "PROD_ID": "100",
    "PROD_NAME": "Laptop",
    "PROD_DESCRIPTION": "Dell Inspiron",
    "SHELF_STOCK": 2,
    "FACING": 3,
    "OUT_OF_STOCK": false,
    "LOCATION": "Aisle",
    "revNum": 0
  },
  {
    "ID": 102,
    "INVENTORY_ID": "L50",
    "PROD_ID": "200",
    "PROD_NAME": "Desktop",
    "PROD_DESCRIPTION": "Dell Dimension",
    "SHELF_STOCK": 3,
    "FACING": 10,
    "OUT_OF_STOCK": false,
    "LOCATION": "Aisle",
    "revNum": 0
  },
  {
    "ID": 103,
    "INVENTORY_ID": "L50",
    "PROD_ID": "300",
    "PROD_NAME": "iPad",
    "PROD_DESCRIPTION": "Apple iPad",
    "SHELF_STOCK": 1,
    "FACING": 4,
    "OUT_OF_STOCK": false,
    "LOCATION": "Aisle",
    "revNum": 0
  },
  {
    "ID": 104,
    "INVENTORY_ID": "L50",
    "PROD_ID": "400",
    "PROD_NAME": "iPhone",
    "PROD_DESCRIPTION": "Apple iPhone",
    "SHELF_STOCK": 6,
    "FACING": 1,
    "OUT_OF_STOCK": false,
    "LOCATION": "Aisle",
    "revNum": 0
  }];
  res.send(inventoryItems)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});