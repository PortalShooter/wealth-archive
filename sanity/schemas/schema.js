import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import svgUploadPreview from 'sanity-plugin-inline-svg';
import imports from "./imports";

export default createSchema({
  name: 'default',
  types: schemaTypes.concat(imports, svgUploadPreview),
})
