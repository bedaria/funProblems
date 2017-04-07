// Given: (string, pattern) =  ( 'catcatdogdogcopper','aabbc')
// patternArray = ['a', 'a', 'b', 'b', 'c']
// patternLetters = {a: 2, b: 2, c: 1}
// var letters = ['a','b','c']
// var letterCounts = [2,2,1]
// var substringLengths = [1,1,1]
// var lastIdx =  letters.length - 1 = 2


//Pattern matching with m arbitrary letters in the pattern.
function patternMatchingN(string, pattern){
  if(!string.length || !pattern.length)
    return false

  var patternArray = Array.from(pattern)

  //counts how many times each letter in the pattern occurs
  var patternLetters = patternArray.reduce((patternLetters, letter) => {
    patternLetters[letter] = patternLetters[letter] !== undefined ? patternLetters[letter] + 1: 1
    return patternLetters
  }, {})

  var letters = []          //unique letters in the pattern
  var letterCounts = []     //counts how many times each letter shows up in the pattern
  var substringLengths = [] //keeps  track of substring lengths(substring[0] keeps track of the substring length for letter[0])
  var lastIdx = -1          //End case for guessLengthsAt() (If there are 4 unique letters, 3 lengths are assumed and the last one calculated.)

  for(key in patternLetters){
    letters.push(key)
    letterCounts.push(patternLetters[key])
  }

  for(var i = 0; i < letters.length; i++)
    substringLengths[i] = 1

  lastIdx = letters.length - 1

  //at each index in the substringLengths array, guess a length
  return guessLengthsforLetters()

  //This function acts like nested for loops. If there are 4 unique
  //letters in the pattern, it will bascially do:
  // for(var i = 0; i < maxSubstringLength; i++)
  //  for(var j = 0; j < maxSubstringLength; j++)
  //    for(var k = 0; k < maxSubstringLength; k++)
  //      calculateLastSubstringLength and check if this is the pattern
  function guessLengthsforLetters(idx) {
    idx = idx || 0
    if(idx === lastIdx) {
      //calculate the length for the last letter of the pattern, given all the
      //other lengths, substringLengths, and the letter occurrences, letterCounts
      var lastIdxLength = (string.length - countCurrentLength(idx))/letterCounts[idx]

      //lastIdxLength should be positive and an integer, so return if it's not
      if(lastIdxLength <= 0 || lastIdxLength % 1 !== 0)
        return false

      //substringLengths should now be complete, it's sum should be string.length
      substringLengths[idx] = lastIdxLength

      return checkPattern() //check if this is a pattern
    } else {
      var isPattern = false
      //A length is valid if it doesn't exceed string.length
      var validLength = true
      //since each substring is of at least length 1, the max length can be limited
      var maxLength = string.length - letters.length - 1

      //keep on trying different lengths till a pattern is found or till the max
      //length is exceeded
      do {
        isPattern = guessLengthsforLetters(idx+1)
        if(!isPattern)
          substringLengths[idx]++
      } while(substringLengths[idx] < maxLength && !isPattern)

      //reset length at idx to 1 "start inner for loop over"
      substringLengths[idx] = 1
      return isPattern
    }
  }

  //Given: letters = ['a', 'b', 'c']
  //       substringLengths = [1,2,6]
  //       string = 'catcatdogdogcopper'
  function checkPattern() {
    var substrings = {}
    var startAt = 0
    var lengths = {}

    for(var i = 0; i < letters.length; i++)
      lengths[letters[i]] = substringLengths[i]

    //given substringLengths [1,2,6]
    //substrings would be {'a': 'c', 'b': 'at', }
    patternArray.forEach(letter => {
      if(substrings[letter] === undefined) //if first occurrence
        substrings[letter] = string.substring(startAt, startAt + lengths[letter])

      startAt += lengths[letter]
    })

    var substringSet = new Set()
    for(key in substrings)
      substringSet.add(substrings[key])

    //Two substrings shouldn't be equal for different letters
    //if pattern  is 'aab' and string is "catcatcat", a and b can't both be 'cat'
    if(substringSet.size !== letters.length)
      return false

    var buildString = ''
    patternArray.forEach(letter => {
      buildString += substrings[letter]
    })

   return buildString === string
  }

  //Given: letterCounts: [2,2,1]
  //       substringLengths: [1,2,6]
  //countCurrentLength(1) = 6
  function countCurrentLength(idx) {
    var currentLength = 0
    for(var i = 0; i < idx; i++)
      currentLength += letterCounts[i]*substringLengths[i]
    return currentLength
  }
}

module.exports = patternMatchingN
