// first we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

import product from './product';
import banner from './banner';

//we name our schema
export default createSchema({
  name: 'default',
  //then proceed to concatenate our document type
  //to the ones provided by any plugins that are installed
  types: schemaTypes.concat([ product, banner /*Your types go here*/]),
});