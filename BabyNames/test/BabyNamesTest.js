const chai = require('chai')
const expect = chai.expect
const babyNames = require('../babyNames.js')
const babyNames_sol2 = require('../babyNames_solution2.js')
const mergeFrequenciesFunctions = [babyNames.mergeFrequencies, babyNames_sol2.mergeFrequencies2]

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

mergeFrequenciesFunctions.forEach((func, idx) => {
  describe("function mergeFrequencies" + (idx+1), () => {

    it("Works when there are no synonyms", () => {
      var synonyms = {}
      var names = [['John', 15], ['Chris', 13]]
      var mergedFrequencies = [['John', 15], ['Chris', 13]]
      var result = func(names, synonyms)

      expect(result.length).to.be.equal(2)
      expect(result).to.eql(mergedFrequencies)
    })

    it("Uses transitive property: ", () => {
      var synonyms = { Jon: [ 'John' ],
                       John: [ 'Jon', 'Johnny' ],
                       Johnny: [ 'John' ] }
      var names = [['Jon', 12], ['Johnny', 13]]
      var result = func(names, synonyms)

      expect(result.length).to.be.equal(1)
      expect(result[0][0]).to.be.oneOf(['Jon', 'Johnny'])
      expect(result[0][1]).to.be.equal(25)
    })

    it("Works when there are synonyms", () => {
      var synonyms = { Jon: [ 'John' ],
                       John: [ 'Jon', 'Johnny' ],
                       Johnny: [ 'John' ],
                       Chris: [ 'Kris', 'Christopher' ],
                       Kris: [ 'Chris' ],
                       Christopher: [ 'Chris' ] }
      var names = [['Chris', 4],['Jon', 12], ['Kris', 13], [ 'Christopher', 19], ['John', 15]]
      var result = func(names, synonyms)

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
})
