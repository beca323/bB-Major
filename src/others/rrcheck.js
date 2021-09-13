export function notnull(target) {
  if (target.replaceAll(' ', '') === '') {
    return false
  } else {
    return true
  }
}
