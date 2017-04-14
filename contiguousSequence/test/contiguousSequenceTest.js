const chai = require('chai')
const expect = chai.expect
const findLargestSum = require('../contiguousSequence.js')


describe("function findLargestSum()", () => {
  it("Returns 2 for [1,1]", () => {
    expect(findLargestSum([1,1])).to.be.equal(2)
  })

  it("Returns -3 for [-1,-2]", () => {
    expect(findLargestSum([-1,0])).to.be.equal(-3)
  })

  it("Returns -3 for [-1,-2,-3]", () => {
    expect(findLargestSum([-1,-2,-3])).to.be.equal(-3)
  })

  it("Returns 5 for [2,-8,3,-2,4,-10]", () => {
    expect(findLargestSum([2,-8,3,-2,4,-10])).to.be.equal(5)
  })

  it("Returns 4 for [1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,-5, 1,0]", () => {
    expect(findLargestSum([1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,-5, 1,0])).to.be.equal(4)
  })

})
