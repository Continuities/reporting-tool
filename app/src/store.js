/**
 * Data store for mutable values
 * @author mtownsend
 * @since June 2020
 */

export const getResources = () => {
  // TODO: Read this from a database
  return [{
    name: 'Leonardo',
    email: 'leo@turtles.com',
    available: true
  }, {
    name: 'Donatello',
    email: 'don@turtles.com',
    available: true
  }, {
    name: 'Raphael',
    email: 'raph@turtles.com',
    available: false
  }, {
    name: 'Michelangelo',
    email: 'mikey@turtles.com',
    available: true
  }, {
    name: 'Splinter',
    email: 'master@turtles.com',
    available: false
  }];
};
