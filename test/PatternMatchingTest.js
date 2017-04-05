const chai = require('chai')
const expect = chai.expect
const patternMatching = require('../problems/PatternMatching.js')


describe("function patternMatching()", () => {

  it("Works for more complex pattern", () => {
    expect(patternMatching('', 'a')).to.be.equal(false)
    expect(patternMatching('cat', 'a')).to.be.equal(true)
    expect(patternMatching('catbread', 'ab')).to.be.equal(true)
    expect(patternMatching('catbread', 'aa')).to.be.equal(true)
    expect(patternMatching('catcat', 'aa')).to.be.equal(true)
    expect(patternMatching('catcatdogcatdog', 'aabab')).to.be.equal(true)
    expect(patternMatching('dogdog', 'ab')).to.be.equal(false)
    expect(patternMatching('foodstain', 'abb')).to.be.equal(false)
  })
})
