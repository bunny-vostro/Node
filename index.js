/* 
* Primary file for API
*
*
*/

// Depenedencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');


// first Thing we want for string_Decoder to be instantialized
// ..and we need to make sure that we are decoding utf-8 encoding
// hence passing the parameter as type string.

let decoder_utf8 = new StringDecoder('UTF-8');

// as you know "Node (TM) deals with the functionality name as Streams, we need to watch streams all right now.
// payloads that are hitting http server as the type of string.
// hence we  need to decode it first, utf-8 is default HTML5 encoding.

// as the emission is continous emission we may get 
// some temp variable to get hold of that data and act acordingly.



// the Server should listen to the port with specified number.
const portNumber = 3000;

// the server should resposnd to all request with all string

// start the server to all request with strings.

const serverConfig = http.createServer((req,res) => {
    // get the Url and Parse it.

    // true : parse the query String ( to call the query String Module)
    let parsedUrl = url.parse(req.url, true);

    // get the path    
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace('/^\/+|\/+$/g','')    
    
    // Get the Request Method
    let requestedMethodType = req.method.toLowerCase();
    
    console.log(`The Request Made to this path with type ${ requestedMethodType }`);
    
    // Get the Hold of Headers as Object type

    let requestMethodHeaderObject = req.headers;

    console.log('The Request Made to these Headers', requestMethodHeaderObject);


    // get the payload if there any.
    // for that we need another library string Decoder
    let buffer = '';

    // as new data comes in we are going to append it buffer.
    // when request object emits the even
    // on the request emit, we want data to be collected.

    req.on('data', (data) => {
        buffer = decoder_utf8.write(data);
    });
    req.on('end',function() {
        buffer += decoder_utf8.end();
        console.log('Request was received with this payload', buffer);
    });



    // Get the Query String as an object : type

    let queryStringObjectType = parsedUrl.query;

    console.log('Requets Query String Object',queryStringObjectType);
   
    // Send the response.
    res.end('Check the Console.\n');

    // Logger
    console.log('Request Received on path : ',trimmedPath);

});

//start the server using server Configuration.

serverConfig.listen(portNumber,() => {          
    console.log(` The Server is listning to ${ portNumber } on localhost.`);
})

// End of Configuration.