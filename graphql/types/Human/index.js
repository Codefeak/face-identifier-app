export default `
type Query {
    human(_id:String, _id:String name: String, hairColor: String, gender: String, description: String, url: String): Human
    humen: [Human]
},
type Mutation {
    addHuman(_id:String!, name: String!, hairColor: String!, gender: String!, description:String,url: String!):Human
    editHuman(_id:String!, name: String, hairColor: String, gender: String, description: String, url: String ): Human
    deleteHuman(_id:String!, name: String, hairColor: String, gender: String, description: String, url: String ): Human
},
type Human{
    _id: String!
    name: String
    hairColor: String
    gender: String
    description: String
    url: String
}
`;
