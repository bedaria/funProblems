const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
const babyNames = require('../test/BabyNames.js')

describe("function toTuples", () => {
  it("Works for {}", () => {
    var result = babyNames.toTuples({})

    expect(result).to.be.an('array')
    expect(result).to.be.empty
  })

  it("Works for { John: 15, Chris: 13 }", () => {
    var result = babyNames.toTuples({John: 15, Chris: 13})
    var tuples = [['John', 15], ['Chris', 13]]

    expect(result).to.eql(tuples)
  })
})

describe("function mergeSynonyms", () => {

  it("Works when synonyms is []", () => {
    var synonyms = []
    var result = babyNames.mergeSynonyms(synonyms)

    expect(result).to.be.an('object')
    expect(result).to.be.empty
  })

  it("Works when synonyms is [['Jon', 'John'], ['John', 'Johnny']]", () => {
    var synonyms = [['Jon', 'John'], ['John', 'Johnny']]
    var mergedSynonyms = { Jon: [ 'John' ],
                          John: [ 'Jon', 'Johnny' ],
                          Johnny: [ 'John' ] }
    var result = babyNames.mergeSynonyms(synonyms)

    expect(result).to.eql(mergedSynonyms)
  })

  it("Works when synonyms is [['Jon', 'John'], ['John', 'Johnny'], ['Chris', 'Kris'], ['Chris', 'Christopher']]", () =>{
    var synonyms = [['Jon', 'John'], ['John', 'Johnny'], ['Chris', 'Kris'], ['Chris', 'Christopher']]
    var mergedSynonyms = { Jon: [ 'John' ],
                           John: [ 'Jon', 'Johnny' ],
                           Johnny: [ 'John' ],
                           Chris: [ 'Kris', 'Christopher' ],
                           Kris: [ 'Chris' ],
                           Christopher: [ 'Chris' ] }
    var result = babyNames.mergeSynonyms(synonyms)

    expect(result).to.eql(mergedSynonyms)
  })
})

describe("function mergeFrequencies", () => {

  it("Works when there are no synonyms", () => {
    var synonyms = []
    var names = [['John', 15], ['Chris', 13]]
    var mergedFrequencies = [['John', 15], ['Chris', 13]]
    var result = babyNames.mergeFrequencies(names, synonyms)

    expect(result).to.eql(mergedFrequencies)
  })

  it("Works when there are synonyms", () => {
    var synonyms = { Jon: [ 'John' ],
                     John: [ 'Jon', 'Johnny' ],
                     Johnny: [ 'John' ],
                     Chris: [ 'Kris', 'Christopher' ],
                     Kris: [ 'Chris' ],
                     Christopher: [ 'Chris' ] }
    var names = [['Chris', 4],['Jon', 12], ['Kris', 13], [ 'Christopher', 19], ['John', 15], ['Becky', 3]]
    var result = babyNames.mergeFrequencies(names, synonyms)

    console.log(" Result: ", result)
    expect(result).to.be.an('array')
    expect(result[0]).to.be.an('array')

    if(['Jon', 'John', 'Jonnhy'].indexOf(result[0][0]) !== -1) {
      expect(result[1][0]).to.be.oneOf(['Chris', 'Kris', 'Christopher'])
      expect(result[0][1]).to.be.equal(27)
      expect(result[1][1]).to.be.equal(36)
    }
    else {
      expect(result[0][0]).to.be.oneOf(['Chris', 'Kris', 'Christopher'])
      expect(result[1][0]).to.be.oneOf(['Jon', 'John', 'Jonnhy'])
      expect(result[0][1]).to.be.equal(36)
      expect(result[1][1]).to.be.equal(27)
    }
  })
})
