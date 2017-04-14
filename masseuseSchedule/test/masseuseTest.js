const chai = require('chai')
const expect = chai.expect
const findOptimalSchedule = require('../masseuseSchedule.js')

describe("function mergeSynonyms", () => {

  it("Works when schedule is []", () => {
    expect(findOptimalSchedule([])).to.be.empty
  })

  it("For [30,15] returns 30", () => {
    expect(findOptimalSchedule([30,15])).to.be.eql(30)
  })

  it("For [30,15,45] returns 75", () => {
    expect(findOptimalSchedule([30,15,45])).to.be.eql(75)
  })

  it("For [15,45,30] returns 45", () => {
    expect(findOptimalSchedule([15,45,30])).to.be.eql(45)
  })

  it("For [15,60,35] returns 60", () => {
    expect(findOptimalSchedule([15,60,35])).to.be.eql(60)
  })

  it("For [15,15,60,30] returns 75", () => {
    expect(findOptimalSchedule([15,15,60,30])).to.be.eql(75)
  })

  it("For [15,15,15,15] returns 30", () => {
    expect(findOptimalSchedule([15,15,15,15])).to.be.eql(30)
  })

  it("For [15,15,15,15,15] returns 45", () => {
    expect(findOptimalSchedule([15,15,15,15,15])).to.be.eql(45)
  })

  it("For [30,15,60,75,45,15,15,45] returns 180", () => {
    expect(findOptimalSchedule([30,15,60,75,45,15,15,45])).to.be.eql(180)
  })

})
