function mergeSort(arr){
  if(!arr.length)
    return []

  arr = arr.map(el => [el])

  while(arr.length !== 1) {
  	var merged = []

    for(var i = 0; i < arr.length - 1; i += 2)
      merged.push(merge(arr[i], arr[i+1]))

    if(arr.length % 2)
      merged.push(arr[arr.length - 1])

    arr = merged.slice()
  }

  return arr[0]
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
