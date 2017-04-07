const chai = require('chai')
const expect = chai.expect
const patternMatching = require('../PatternMatching.js')


describe("function patternMatching()", () => {

  it("Works for ('', 'a')", () => {
    expect(patternMatching('', 'a')).to.be.equal(false)
  })

  it("Works for ('cat', '')", () => {
    expect(patternMatching('cat', '')).to.be.equal(false)
  })

  it("Works for ('', '')", () => {
    expect(patternMatching('', '')).to.be.equal(false)
  })

  it("Works for ('cat', 'a')", () => {
    expect(patternMatching('cat', 'a')).to.be.equal(true)
  })

  it("Works for ('cat', 'b')", () => {
    expect(patternMatching('cat', 'b')).to.be.equal(true)
  })

  it("Works for ('catbread', 'ab')", () => {
    expect(patternMatching('catbread', 'ab')).to.be.equal(true)
  })

  it("Works for ('catbread', 'ba')", () => {
    expect(patternMatching('catbread', 'ba')).to.be.equal(true)
  })

  it("Works for ('catbread', 'aa')", () => {
    expect(patternMatching('catbread', 'aa')).to.be.equal(false)
  })

  it("Works for ('catbread', 'bb')", () => {
    expect(patternMatching('catbread', 'bb')).to.be.equal(false)
  })

  it("Works for ('catcat', 'aa')", () => {
    expect(patternMatching('catcat', 'aa')).to.be.equal(true)
  })

  it("Works for ('catcatdogcatdog', 'aabab')", () => {
    expect(patternMatching('catcatdogcatdog', 'aabab')).to.be.equal(true)
  })

  it("Works for ('dogdog', 'ab')", () => {
    expect(patternMatching('dogdog', 'ab')).to.be.equal(true)
  })

  it("Works for ('foodstain', 'abb')", () => {
    expect(patternMatching('foodstain', 'abb')).to.be.equal(false)
  })

  it("Works for ('foodstainain', 'abb')", () => {
    expect(patternMatching('foodstainain', 'abb')).to.be.equal(true)
  })
})
