const chai = require('chai')
const expect = chai.expect
const mergeSort_iterative = require('../mergeSort-iterative.js')
const mergeSort_recursive = require('../mergeSort-recursive.js')
const quickSort = require('../quickSort.js')


describe("functions mergeSort_iteratvie, mergeSort_recursive, quickSort", () => {

  it("Works for []", () => {
    expect(mergeSort_recursive([])).to.be.empty
    expect(mergeSort_iterative([])).to.be.empty
    expect(quickSort([])).to.be.empty
  })

  it("Works for [4,3,2,5,78,90,43,2,5,6,78,22,21]", () => {
    const array = [4,3,2,5,78,90,43,2,5,6,78,22,21]
    const sorted = array.sort((a,b) => (a > b ? 1 : -1))

    expect(mergeSort_recursive(array)).to.eql(sorted)
    expect(mergeSort_iterative(array)).to.eql(sorted)
    expect(quickSort(array)).to.eql(sorted)
  })

  it("Works for large array", () => {
    const largeArray = []
    for(var i = 0; i < 2000; i++)
      largeArray[i] = Math.floor(Math.random()*1000)

    const sorted = largeArray.sort((a,b) => (a > b ? 1 : -1))

    expect(mergeSort_recursive(largeArray)).to.eql(sorted)
    expect(mergeSort_iterative(largeArray)).to.eql(sorted)
    expect(quickSort(largeArray)).to.eql(sorted)
  })

})
