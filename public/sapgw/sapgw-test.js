module( "Service" );   

/* Test 1.1 */        
var request = {
  resourcePath: ".", 
  headers: {Accept: "application/xml"}
};
odataTest("Read Service Description", 3, request, function (response, data) {
  equal(response.statusCode, 200, "StatusCode: 200");
  equal(data.workspaces.length, 1, "Number of Workspaces: 1");
  equal(data.workspaces[0].collections.length, 8, "Number of Collections: 1");
});

module( "CarrierCollection" );

/* Test 2.1 */        
var request = {
  resourcePath: "CarrierCollection/$count", 
  headers: {Accept: "text/plain"}
};
odataTest("Number of Carriers", 3, request, function (response, data) {
  equal(response.statusCode, 200, "StatusCode: 200");
  expectedHeaders(response.headers, { "Content-Type" : "text/plain" }, "Content-Type: text/plain")
  equal(data, '18', "Number of Carriers: 18");
});

/* Test 2.2 */        
var request = {
  resourcePath: "CarrierCollection('LH')", 
  headers: {Accept: "application/atom+xml"}
};
odataTest("Lufthansa", 3, request, function (response, data) {
  equal(response.statusCode, 200, "StatusCode: 200");
  expectedHeaders(response.headers, { "Content-Type" : "application/atom+xml" }, "Content-Type: application/atom+xml")
  equal(data.AirLineName, 'Lufthansa', "AirLineName: Lufthansa");
});