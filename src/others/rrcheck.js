export function notnull(target) {
  if (target.replaceAll(' ', '') === '') {
    return false
  } else {
    return true
  }
}

export function notnulls(targets) {
  for (let i = 0; i < targets.length; i++) {
    if (!notnull(targets[i])) {
      return false
    }
  }
  return true
}