export default `
    type Query {
        human(socialID:String, name: String, hairColor: String, gender: String, description:String, url: String): Human
        humen: [Human]
    },
type Mutation {
    addHuman(socialID:String!, name: String!, hairColor: String!, gender: String!, description:String, url: String!):Human
    editHuman(socialID:String!, name: String, hairColor: String, gender: String, description:String, url: String ): Human
    deleteHuman(socialID:String!, name: String, hairColor: String, gender: String, description:String, url: String ): Human
},
type Human{
    socialID: String!
    name: String
    hairColor: String
    gender: String
    description: String
    url: String
}
`;
