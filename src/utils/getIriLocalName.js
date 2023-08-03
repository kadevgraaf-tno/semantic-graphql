const pound = '#'
const slash = '/'
const colon = ':'
const memory = {}

function sliceOrFail(string, sep) {
  const array = string.split(sep)
  const l = array.length

  return l < 2 ? null : array[l - 1]
}

// Extracts the localName of an IRI
// Algo inspired by http://rdf4j.org/javadoc/latest/org/eclipse/rdf4j/model/IRI.html
function getIriLocalName(iri) {
  if (memory[iri]) return memory[iri] // !
  if (!(typeof iri === 'string' && iri.includes(colon))) throw new Error(`Given IRI "${iri}" is invalid`)

  let workingIri = iri
  const protocolArray = iri.split('://')

  if (protocolArray.length > 2) throw new Error(`Given IRI "${iri}" is invalid`)
  if (protocolArray.length > 1) workingIri = protocolArray[1] // eslint-disable-line prefer-destructuring

  const resPound = sliceOrFail(workingIri, pound)

  if (typeof resPound === 'string') {
    if (!resPound.length) throw new Error(`Given IRI "${iri}" is invalid`)

    return memory[iri] = resPound
  }

  const resSlash = sliceOrFail(workingIri, slash)

  if (typeof resSlash === 'string') {
    if (!resSlash.length) throw new Error(`Given IRI "${iri}" is invalid`)

    return memory[iri] = resSlash
  }
  const resColon = sliceOrFail(workingIri, colon)

  if (typeof resColon === 'string') {
    if (!resColon.length) throw new Error(`Given IRI "${iri}" is invalid`)

    return memory[iri] = resColon
  }

  throw new Error(`Given IRI "${iri}" is invalid`)
}

module.exports = getIriLocalName
