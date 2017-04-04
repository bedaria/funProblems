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

//For every name finds all of it's synonyms
//INPUT: synonyms: [['Jon', 'John'], ['John', 'Johnny'], ['Chris', 'Kris'], ['Chris', 'Christopher']]
//OUTPUT: mergedSynonyms: { Jon: [ 'John' ],
//                          John: [ 'Jon', 'Johnny' ],
//                          Johnny: [ 'John' ],
//                          Chris: [ 'Kris', 'Christopher' ],
//                          Kris: [ 'Chris' ],
//                          Christopher: [ 'Chris' ] }
function  mergeSynonyms(synonyms) {
  var mergedSynonyms = {}
  const addPair = function(first, second) {
    if(!mergedSynonyms[first])
      mergedSynonyms[first] = [second]
    else
      mergedSynonyms[first].push(second)
  }

  synonyms.forEach(pair => {
    var first = pair[0]
    var second = pair[1]

    addPair(first, second)
    addPair(second, first)
  })

  return mergedSynonyms
}

//Merges frequencies based on given synonyms
//INPUT: names:[['John', 15], ['Jon', 12], ['Chris', 13], ['Kris', 4], ['Christopher', 19]]
//       mergedSynonyms: { Jon: [ 'John' ],
//                         John: [ 'Jon', 'Johnny' ],
//                         Johnny: [ 'John' ],
//                         Chris: [ 'Kris', 'Christopher' ],
//                         Kris: [ 'Chris' ],
//                         Christopher: [ 'Chris' ] }
//OUTPUT: {'John': 27, 'Kris': 36}
function mergeFrequencies(names, mergedSynonyms) {
  var mergedFrequencies = {}

  names.forEach(pair => {
    var name = pair[0]
    var frequency = pair[1]

    if(mergedSynonyms[name]){
      //if name has a synonym, check if any of it's synonyms are in mergedFrequencies already
      var isInMergedFrequencies = false
      var queue = [name]
      var visited = new Set()

      while(queue.length) {
        var current = queue.shift()
        visited.add(current)

        if(mergedFrequencies[current]){
          isInMergedFrequencies = true
          mergedFrequencies[current] += frequency
        }

        mergedSynonyms[current].forEach(node => {
          if(!visited.has(node))
            queue.push(node)
        })
      }
      //if none of it's synonyms are in mergedFrequencies, then it's the first occurrence
      //so just add it
      if(!isInMergedFrequencies)
        mergedFrequencies[name] = frequency
    }
    else //if name doesn't have any synonyms, then just add it to mergedFrequencies
      mergedFrequencies[name] = frequency
  })

  return toTuples(mergedFrequencies)
}

function toTuples(obj) {
  var tuples = []

  for(key in obj)
    tuples.push([key, obj[key]])

  return tuples
}

module.exports = {
  mergeSynonyms,
  mergeFrequencies,
  toTuples
}
