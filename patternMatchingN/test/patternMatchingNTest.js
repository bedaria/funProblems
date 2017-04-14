const chai = require('chai')
const expect = chai.expect
const patternMatchingN = require('../patternMatchingN.js')


describe("function patternMatchingN()", () => {

  it("Works for ('', 'abvnfj')", () => {
    expect(patternMatchingN('', 'abvnfj')).to.be.equal(false)
  })

  it("Works for ('cat', '')", () => {
    expect(patternMatchingN('cat', '')).to.be.equal(false)
  })

  it("Works for ('', '')", () => {
    expect(patternMatchingN('', '')).to.be.equal(false)
  })

  it("Works for ('cat', 'a')", () => {
    expect(patternMatchingN('cat', 'a')).to.be.equal(true)
  })

  it("Works for ('cat', 'b')", () => {
    expect(patternMatchingN('cat', 'b')).to.be.equal(true)
  })

  it("Works for ('catbread', 'ab')", () => {
    expect(patternMatchingN('catbread', 'ab')).to.be.equal(true)
  })

  it("Works for ('catbread', 'ba')", () => {
    expect(patternMatchingN('catbread', 'ba')).to.be.equal(true)
  })

  it("Works for ('catbread', 'aa')", () => {
    expect(patternMatchingN('catbread', 'aa')).to.be.equal(false)
  })

  it("Works for ('catbread', 'bb')", () => {
    expect(patternMatchingN('catbread', 'bb')).to.be.equal(false)
  })

  it("Works for ('catcat', 'aa')", () => {
    expect(patternMatchingN('catcat', 'aa')).to.be.equal(true)
  })

  it("Works for ('catcatdogcatdogchowchow', 'aababcc')", () => {
    expect(patternMatchingN('catcatdogcatdogchowchow', 'aababcc')).to.be.equal(true)
  })

  it("Works for ('dogdogcatbirddog', 'abcdb')", () => {
    expect(patternMatchingN('dogdogcatdogbird', 'abcdb')).to.be.equal(true)
  })

  it("Works for ('justawordandanotherbutnomore', 'abcdef')", () => {
    expect(patternMatchingN('justawordandanotherbutnomore', 'abcdef')).to.be.equal(true)
  })

  it("Works for ('foodstainain', 'abb')", () => {
    expect(patternMatchingN('foodstainain', 'abb')).to.be.equal(true)
  })

  it("Works for ('catcatcat', 'abb')", () => {
    expect(patternMatchingN('catcatcat', 'abb')).to.be.equal(false)
  })

  it("Works for ('catbreaddogbananacatbreadbananadog', 'abcdabdc')", () => {
    expect(patternMatchingN('catbreaddogbananacatbreadbananadog', 'abcdabdc')).to.be.equal(true)
  })
})
