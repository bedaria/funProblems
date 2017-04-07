function guessLengthAt(idx) {
  if(idx === lastIdx) {
    //calculate the length for the last letter of the pattern, given all the
    //other lengths, substringLengths, and the letter occurrences, letterCounts
    var lastIdxLength = (string.length - countCurrentLength(idx))/letterCounts[idx]

    //lastIdxLength should be positive and an integer, so return if it's not
    if(lastIdxLength <= 0 || lastIdxLength % 1 !== 0)
      return false

    //substringLengths should now be complete, it's sum should be string.length
    substringLengths[idx] = lastIdxLength
    console.log("i: ", idx, " substringLengths: ", substringLengths)

    return checkPattern() //check if this is a pattern
  } else {
    var isPattern = false
    //A length is valid if it doesn't exceed string.length
    var validLength = true
    //since each substring is of at least length 1, the max length can be limited
    var maxLength = string.length - letters.length - 1

    //keep on trying different lengths till a pattern is found or till the max
    //lengths are exceeded
    do {
      isPattern = guessLengthAt(idx+1)
      if(!isPattern)
        substringLengths[idx]++
    } while(substringLengths[idx] < maxLength && !isPattern)

    //reset length at idx to 1
    substringLengths[idx] = 1
    return isPattern
  }
}
//Given: letters = ['a', 'b', 'c']
//       substringLengths = [1,2,6]
//       string = 'catcatdogdogcopper'
var checkPattern = () => {
  var substrings = {}
  var startAt = 0
  var lengths = {}

  for(var i = 0; i < letters.length; i++)
    lengths[letters[i]] = substringLengths[i]

  console.log("lengths: ", lengths)
  //given substringLengths [1,2,6]
  //substrings would be {'a': 'c', 'b': 'at', }
  patternArray.forEach(letter => {
    if(substrings[letter] === undefined) //if first occurrence
      substrings[letter] = string.substring(startAt, startAt + lengths[letter])

    startAt += lengths[letter]
  })

  var buildString = ''
  patternArray.forEach(letter => {
    buildString += substrings[letter]
  })
console.log("for: ", substringLengths, " : ", buildString)
 return buildString === string
}

//Given: letterCounts: [2,2,1]
//       substringLengths: [1,2,6]
//countCurrentLength(1) = 6
var countCurrentLength = (idx) => {
  var currentLength = 0
  for(var i = 0; i < idx; i++)
    currentLength += letterCounts[i]*substringLengths[i]
  return currentLength
}

// (string, pattern) :  ( 'catcatdogdogcopper','aabbc')
// patternArray = ['a', 'a', 'b', 'b', 'c']
// patternLetters = {a: 2, b: 2, c: 1}
// firstOccurrenceOfEachLetter = {a: 0, b: 2, c: 4}
// var letters = ['a','b','c']
// var letterCounts = [2,2,1]
// var substringLengths = [1,1,1]
// var lastIdx =  letters.length - 1 = 2

//Pattern matching with m arbitrary letters in the pattern.
function patternMatchingN(string, pattern){

  var patternArray = Array.from(pattern)
  //patternLetters = {a: 2, b: 3, c:2}
  var patternLetters = patternArray.reduce((patternLetters, letter) => {
    patternLetters[letter] = patternLetters[letter] !== undefined ? patternLetters[letter] + 1: 1
    return patternLetters
  }, {})

  var letters = []          //['a','b','f',...,'d']
  var letterCounts = []     //[2,1,3,....,2]
  var substringLengths = [] //[1,1,1,....,1]
  var lastIdx = -1

  for(key in patternLetters){
    letters.push(key)
    letterCounts.push(patternLetters[key])
  }

  for(var i = 0; i < letters.length; i++)
    substringLengths[i] = 1

  lastIdx = letters.length - 1
  //at each index in the substringLengths array, guess a length
  return guessLengthAt(0)
}
