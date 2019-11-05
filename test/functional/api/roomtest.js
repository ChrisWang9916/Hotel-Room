const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

let datastore = require("../../../models/rooms");;


describe("Roomss", () => {

    describe("Rooms", () => {
        beforeEach(() => {
          while (datastore.length > 0) {
            datastore.pop();
          }
          datastore.push({
                id: 1000000,
                roomtype: "twinRoom",
                price: 50,
                roomNumber: 605,
                available: 'unavailable'
            });
            datastore.push({
                id: 1000001,
                roomtype: "KingBedRoom",
                price: 60,
                roomNumber: 714,
                available: 'available'
            });
        })    
    });
    describe("GET /rooms", () => {
        it("should GET all the rooms", done => {
            request(server)
                .get("/rooms")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.equal(2);
                    const result = _.map(res.body, room => {
                    return { id: room.id, roomNumber: room.roomNumber };
                    });
                    expect(result).to.deep.include({ id: 1000000, roomNumber: 605 });
                    expect(result).to.deep.include({ id: 1000001, roomNumber: 714 });
                    done(err);
                }).timeout(5000)
        });
    });
    describe("GET /rooms/:id", () => {
        describe("when the id is valid", () => {
          it("should return the matching room", done => {
            request(server)
              .get(`/rooms/${datastore[0].id}`)
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .end((err, res) => {
                expect(res.body).to.deep.include(datastore[0]);
                done(err);
              });
          });
        });
        describe("when the id is invalid", () => {
          it("should return the NOT found message", done => {
            request(server)
              .get("/rooms/9999")
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .expect({ message: "Room NOT Found!" }, (err, res) => {
                done(err);
                });
          });
        });
    });
    describe("GET /room/:roomNumber", () => {
        describe("when the roomNumber is valid", () => {
          it("should return the matching room", done => {
            request(server)
              .get(`/room/${datastore[0].roomNumber}`)
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .end((err, res) => {
                expect(res.body).to.deep.include(datastore[0]);
                done(err);
              });
          });
        });
        describe("when the roomNumber is invalid", () => {
          it("should return the NOT found message", done => {
            request(server)
              .get("/room/9999")
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .expect({ message: "Room NOT Found!" }, (err, res) => {
                done(err);
            });
          });
        });
    });
    describe("POST /rooms", () => {
        it("should return confirmation message and update datastore", () => {
          const room = {
            roomtype: 'twinRoom',
            price: 50,
            roomNumber: 202,
            available: 'available'
          };
          return request(server)
            .post("/rooms")
            .send(room)
            .expect(200)
            .expect({ message: "Room Successfully Added!" });
        });
        after(() => {
            return request(server)
              .get("/rooms")
              .expect(200)
              .then(res => {
                expect(res.body.length).equals(3);
                const result = _.map(res.body, room => {
                  return {
                    roomtype: room.roomtype,
                    roomNumber: room.roomNumber
                  };
                });
                expect(result).to.deep.include({ roomtype: 'twinRoom', roomNumber: 202 });
              });
          });
      });
})