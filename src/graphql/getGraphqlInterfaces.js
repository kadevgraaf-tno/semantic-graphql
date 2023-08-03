const { rdfsSubClassOf, rdfsResource } = require('../constants')
const { walkmap } = require('../graph/traversal')

const getGraphqlInterfaceType = require('./getGraphqlInterfaceType')

function getGraphqlInterfaces(g, iri) {
  const interfaces = []

  // Find super-classes of the class and their super-classes
  walkmap(g, iri, rdfsSubClassOf)
  // Many universal properties, like label and comment, have rdfs:Resource in their domain
  .add(rdfsResource)
  .forEach(classIri => interfaces.push(getGraphqlInterfaceType(g, classIri)))

  if (g.config.relay) interfaces.push(g.nodeInterface)

  return interfaces
}

module.exports = getGraphqlInterfaces
