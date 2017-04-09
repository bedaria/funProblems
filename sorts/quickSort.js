function quickSort(arr){
  if(arr.length < 2)
    return arr
  else {
    var q = arr.length - 1
    var pivot = arr[q]

    for(var i = q-1; i >= 0; i--) {
      if(arr[i] > pivot) {
        var temp = arr[i]
        var j = i
        while(j < q) {
          arr[j] = arr[j+1]
          j++
        }
        arr[j] = temp
        q = j-1
      }
    }
    var left = quickSort(arr.slice(0,q))
    var element = quickSort(arr.slice(q,q+1))
    var right = quickSort(arr.slice(q+1))

    return left.concat(element.concat(right))
  }
}

module.exports = quickSort
