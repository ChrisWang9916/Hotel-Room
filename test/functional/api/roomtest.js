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
})