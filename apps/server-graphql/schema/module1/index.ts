const typeDefs = `#graphql
# Everything user can read
type Query {
  file(id: ID!): File # Takes id property as an argument and returns a File
  files: [File!]! # Returns every file stored
}

# Everthing user can change
type Mutation {
  renameFile(
    id: ID! # An ID of the file to be changed
    name: String! # A new name of the file
  ): File

  deleteFile(
    id: ID! # Id of the file to be deleted
  ): File
}
`;

export default typeDefs;
