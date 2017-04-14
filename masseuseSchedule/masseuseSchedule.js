/*A popular masseuse receives a sequence of back-to-back appointment requests
and is debating which ones to accept. She needs a 15-minute break between
appointments and therefore she cannot accept any adjacent requests. Given a
sequence of back-to-back appointment requests (all multiples of 15 minutes, none
overlap, and none can be moved), find the optimal (highest total booked minutes)
set the masseuse can honor. Return the number of minutes.

INPUT: [30,15,60,75,45,15,15,45]
OUTPUT: 180 minutes, ([30, 60, 45, 45])
*/
function findOptimalSchedule(array) {
  if(!array.length)
    return 0

  var bestTotal = 0

  function findBest(currentIdx, total) {
    if(currentIdx >= array.length - 2)
      if(total > bestTotal)
        bestTotal = total

    for(var i = currentIdx + 2; i < array.length; i++)
      findBest(i, total + array[i])
  }

  for(var i = 0; i < array.length; i++)
    findBest(i, array[i])

  return bestTotal
}

module.exports = findOptimalSchedule
