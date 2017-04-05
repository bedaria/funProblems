/*Each year, the government releases a list of the 10000 most common baby names
and their frequencies (the number of babies with that names). The only problems
with this is that some names have multiple spellings. For example, "John" and
"Jon" are essentially the same name but would be listed separately in the list.
Given two lists, one of the names/frequencies and the other of pairs of
equivalent name, write an algorithm to print a new list of the true frequency of
each name. Note that if John and Jon are synonyms, and Jon and Johnny are
synonyms, then John and Johnny are synonyms. (It is both transitive and
symmetric.) In the final list, any name can be used as teh 'real' name.

INPUT: names: [['John', 15], ['Jon', 12], ['Chris', 13], ['Kris', 4], [ 'Christopher', 19]]
       synonyms: [['Jon', 'John'], ['John', 'Johnny'], ['Chris', 'Kris'], ['Chris', 'Christopher']]
OUTPUT: [['John', 27], ['Kris', 36]]
*/
const toTuples = require('./BabyNames.js').toTuples

function mergeFrequencies2(names, mergedSynonyms) {
  var alreadyVisited = new Set()
  var nameFrequencies = names.reduce((nameFrequencies, tuple) => {
     nameFrequencies[tuple[0]] = tuple[1]
     return nameFrequencies
   }, {})

  var deepSearch = (name, isFirst, firstKey) => {
    alreadyVisited.add(name)
    if(nameFrequencies[name] && !isFirst){
      nameFrequencies[firstKey] += nameFrequencies[name]
      delete nameFrequencies[name]
    }
    else if(nameFrequencies[name] && isFirst){
      isFirst = false
      firstKey = name
    }

    mergedSynonyms[name].forEach(n => {
      if(!alreadyVisited.has(n))
        deepSearch(n, isFirst, firstKey)
    })
  }

  for(key in mergedSynonyms)
    if(!alreadyVisited.has(key))
      deepSearch(key, true)

  return toTuples(nameFrequencies)
}

module.exports = {
  mergeFrequencies2
}
