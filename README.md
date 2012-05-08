[OData](http://www.odata.org/) acceptance tests with [QUnit](http://qunitjs.com/) 
===========

This project provides a [QUnit](http://qunitjs.com/) addon `qunit-odata` which helps you to 
quickly create acceptance tests [OData](http://www.odata.org/) services.
It uses [datajs](http://datajs.codeplex.com) as OData client library. 

#### A minimal qunit-odata test setup 
This html file should be located on the same origin as the odata service.
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta http-equiv='X-UA-Compatible' content='IE=edge' />
  <title>OData Test Suite</title>
  <link rel="stylesheet" href="http://code.jquery.com/qunit/qunit-git.css">
</head>
<body>
  <div id="qunit"></div>
  <script src="datajs-1.0.3.js"></script>
  <script src="http://code.jquery.com/qunit/qunit-git.js"></script>
  <script src="qunit-odata.js" data-service-root="/OData/OData.svc/"></script>  
  <script src="odata-test.js"></script>    
</body>
</html>
````
#### The contents of odata-test.js
This is an example for odata testsuite file (e.g odata-test.js from 
the above html file).

```javascript
/* First Test */        
var request = {
  resourcePath: ".", 
  headers: {DataServiceVersion: "999.0"}
};
odataTest("Read with invalid DataServiceVersion", 1, request, function (response, data) {
  equal(response.statusCode, 400, "StatusCode: 400");
});

module( "Products" );    

/* Second Test */
request = "Products(1)";
odataTest("Read Entity - Product 1", 4, "Products(1)" , function (response, data) {
  equal(response.statusCode, 200, "StatusCode: 200");
  expectedHeaders(response.headers, { DataServiceVersion: "2.0" }, "DataServiceVersion: 2.0");
  equal(data.Name, 'Milk', "Name: 'Milk'");
  deepEqual(data.ReleaseDate, new Date("1 Oct 1995 GMT"), "ReleaseDate: 1995-10-01");
});
```

#### Demo
Want to to it in action? [See this demo.](http://odata-test.herokuapp.com/) 


