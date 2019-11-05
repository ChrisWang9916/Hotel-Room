Name: Fubo Wang
Student ID: 20086458

Brief description of functionality: 
This application is part of the hotel management system. The hotel can use this app to manage hotel room information and employees information. This app provides query, modify, add, and delete features.

App Features (all via RESTful API): 
	POST a room type, a price, a room number and available in JSON format
	GET a list of rooms
	GET a room using an ID
	GET a room using a room number
	DELETE a room using an ID
	PUT room’s available

~~~
 Roomss
    GET /rooms
GET /rooms 200 12.683 ms - 184
      √ should GET all the rooms (69ms)
    GET /rooms/:id
      when the id is valid
GET /rooms/1000000 200 1.622 ms - 90
        √ should return the matching room
      when the id is invalid
GET /rooms/9999 200 1.397 ms - 29
        √ should return the NOT found message
    GET /room/:roomNumber
      when the roomNumber is valid
GET /room/605 200 0.805 ms - 90
        √ should return the matching room
      when the roomNumber is invalid
GET /room/9999 200 0.472 ms - 29
        √ should return the NOT found message
    POST /rooms
POST /rooms 200 43.250 ms - 38
      √ should return confirmation message and update datastore (51ms)
GET /rooms 200 2.136 ms - 272
    PUT /rooms/:id
PUT /rooms/1000001 500 15.282 ms - 64
      1) should return a message and change available
GET /rooms/1000001 200 1.075 ms - 91
      2) "after all" hook for "should return a message and change available"
    DELETE /rooms/:id
DELETE /rooms/1000000 200 0.321 ms - 138
      √ should delete a room
GET /rooms 200 1.018 ms - 181


  7 passing (369ms)
  2 failing

  1) Roomss
       PUT /rooms/:id
         should return a message and change available:
     Error: expected 200 "OK", got 500 "Internal Server Error"
      at Test._assertStatus (node_modules\supertest\lib\test.js:268:12)
      at Test._assertFunction (node_modules\supertest\lib\test.js:283:11)
      at Test.assert (node_modules\supertest\lib\test.js:173:18)
      at localAssert (node_modules\supertest\lib\test.js:131:12)
      at C:\Users\1\Documents\hotelroomandemployee\node_modules\supertest\lib\test.js:128:5
      at Test.Request.callback (node_modules\superagent\lib\node\index.js:728:3)
      at IncomingMessage.parser (node_modules\superagent\lib\node\index.js:916:18)
      at endReadableNT (_stream_readable.js:1145:12)
      at process._tickCallback (internal/process/next_tick.js:63:19)

  2) Roomss
       PUT /rooms/:id
         "after all" hook for "should return a message and change available":

      AssertionError: expected { Object (id, roomtype, ...) } to have property 'available' of 'unavailable', but got 'available'
      + expected - actual

      -available
      +unavailable

      at request.get.set.expect.expect.then.res (test\functional\api\roomtest.js:158:41)
      at process._tickCallback (internal/process/next_tick.js:68:7)
~~~
