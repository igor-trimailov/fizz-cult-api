function isoDateWithOffset(offset) {
  if (typeof offset !== 'number') {
    return null
  }

  return new Date(Date.now() + offset).toISOString()
}

module.exports = {
  isoDateWithOffset,
}
