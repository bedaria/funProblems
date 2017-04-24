/* You are given an array of integers (both positive and negative).
Find the contiguous sequence with the largest sum. Return the sum.
INPUT: [2,-8,3,-2,4,-10]
OUTPUT: 5
*/
function findLargestSum(sequence) {
  if(!Array.isArray(sequence) || sequence.length  < 1)
    return "Invalid input"

  var largestSum = sequence[0] + sequence[1];
  var sumSoFar = sequence[0] + sequence [1];
  var anotherSum = sumSoFar

  for(var i = 2; i < sequence.length; i++) {
    sumSoFar += sequence[i]
    largestSum = sumSoFar > largestSum ? sumSoFar : largestSum
    anotherSum = sumSoFar

    for(var j = 0; j < i-1; j++) {
      anotherSum -= sequence[j]
      largestSum = anotherSum > largestSum ? anotherSum : largestSum
    }
  }

  return largestSum
}

module.exports = findLargestSum
