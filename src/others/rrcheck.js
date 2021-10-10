export function notnull(target) {
  if (target.replaceAll(' ', '') === '') {
    return false
  } else {
    return true
  }
}

export function closeFirebase() {
  if (true) {
    console.log('check check')
    return true
  }
}

export function notnulls(array) {
  for (let k = 0; k < array.length; k++) {
    if (!notnull(array[k])) {
      return false
    }
    return true
  }
}