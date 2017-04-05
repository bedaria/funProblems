/*You are given two strings, pattern and value. The Pattern string consists of
just the letters a and b, describing a pattern within a string. For example,
the string catcatgocatgo matches the pattern aabab (where cat is a and go is b).
It also matches patterns like a, ab, and b. Write a method to determine if value
matches pattern.
*/

//Check if the given pattern made up of 'a','b' could work
//INPUT: aLength, bLength -> integers
//       pattern -> string made up of a's and b's
//       string -> string
//OUTPUT: boolean
function checkPattern(aLength, bLength, pattern, string, startsWith){
  var aString = string.substring(0, aLength)
  var bString;
  var startAt = aLength

  //find bString
  for(var i = 1; i < pattern.length; i++) {
    if(pattern[i] === startsWith)
      startAt += aLength
    bString = string.substring(startAt, startAt + bLength)
    break;
  }

  if(aString === bString)
    return false

  var testString = []
  pattern.split('').forEach(letter => {
    letter === startsWith ? testString.push(aString) : testString.push(bString)
  })

  return testString.join('') === string
}

function patternMatching(string, pattern) {
  if(!string.length || !pattern.length)
    return false

  var a = 0
  var b = 0
  var patternStartsWith = pattern[0]
  pattern.split('').forEach(letter => {
    //count the number of each letter in the pattern
    letter === 'a' ? a++ : b++
  })

  //if there are no 'b's in the pattern, then 'a' could be the entire string,
  //otherwise b has to be at least length 1
  var strLength = b === 0 ? string.length: string.length - 1

  //assume that 'a' has length i
  for(var aLength = 1; aLength <= strLength; aLength++){
    //calculate length of 'b' based on length of 'a'
    var bLength = (b > 0) ? (string.length - a*aLength)/b : 0

    //'a','b' should both have integer lengths, so only check for pattern if
    //the string can be divided evenly given aLength, bLength
    //if(b > 0 && bLength > 0)
    if(bLength % 1 === 0) {
      var foundPattern = false

      if(patternStartsWith === 'b')
        foundPattern = checkPattern(bLength, aLength, pattern, string, patternStartsWith)
      else
        foundPattern = checkPattern(aLength, bLength, pattern, string, patternStartsWith)

      if(foundPattern)
        return true
    }
  }

  return false
}

module.exports = patternMatching
