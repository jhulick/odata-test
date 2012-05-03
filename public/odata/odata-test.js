module( "Service" );   

/* Test 1.1 */        
var request = {
  resourcePath: ".", 
  headers: {DataServiceVersion: "999.0"}
};
odataTest("Read with invalid DataServiceVersion", 1, request, function (response, data) {
  equal(response.statusCode, 400, "StatusCode: 400");
});

module( "Products" );    

/* Test 2.1 */
request = "Products(1)";
odataTest("Read Entity - Product 1", 4, request , function (response, data) {
  equal(response.statusCode, 200, "StatusCode: 200");
  expectedHeaders(response.headers, { DataServiceVersion: "2.0" }, "DataServiceVersion: 2.0");
  equal(data.Name, 'Milk', "Name: 'Milk'");
  deepEqual(data.ReleaseDate, new Date("01 Oct 1995 GMT"), "ReleaseDate: 1995-10-01");
});

/* Test 2.2 */
request = {
  method: 'GET',
  resourcePath: "Products(2)/ReleaseDate",
  recognizeDates: true     
};      
odataTest("Read Property of Product 2", 2, request, function (response, data) {
  expectedHeaders(response.headers, { DataServiceVersion: "1.0" }, "DataServiceVersion: 1.0");
  deepEqual(data, { ReleaseDate : new Date("01 Oct 2000 GMT") }, "ReleaseDate: 2000-10-01");
});