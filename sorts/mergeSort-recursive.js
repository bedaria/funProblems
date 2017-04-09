function mergeSort(arr) {
  var midPoint;

  if(arr.length % 2) midPoint = arr.length/2
  else midPoint = Math.floor(arr.length/2)

  if(arr.length <= 1)
    return arr

  var left = mergeSort(arr.slice(0, midPoint))
  var right = mergeSort(arr.slice(midPoint, arr.length))

  return merge(left, right)
}

function merge(left, right){
	var sorted = []

  while(left.length && right.length) {
    if(left[0] < right[0]) {
      sorted.push(left[0])
      left.splice(0,1)
    }
	  else {
      sorted.push(right[0])
      right.splice(0,1)
	  }
  }

  while(left.length) {
    sorted.push(left[0])
    left.splice(0,1)
  }

  while(right.length) {
    sorted.push(right[0])
    right.splice(0,1)
  }

  return sorted
}

module.exports = mergeSort
