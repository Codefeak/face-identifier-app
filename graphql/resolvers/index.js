import { mergeResolvers } from "merge-graphql-schemas";

import Human from "./Human";

const resolver = [Human];

export default mergeResolvers(resolver, { all: true });
