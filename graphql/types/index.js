import { mergeTypes} from 'merge-graphql-schemas';

import Human from './Human/';

const typeDefs = [Human];
export default mergeTypes(typeDefs, {all: true});
