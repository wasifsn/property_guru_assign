const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Product{
  _id:ID
  name: String
  description: String
  price: Float
  color: String
  material: String
  brand: String
  weight: Int
  availibility: Boolean
  image: String
  categoryId: ID
}    
type ProductData {
  products: [Product!]!
}
input ProductInputData {
  _id:ID!
  name: String!
  description: String!
  price: Float!
  color: String!
  material: String!
  brand: String!
  weight: Int
  availibility: Boolean
  image: String!
  categoryId: ID
}
type RootQuery {
  products: ProductData!
}
type RootMutation {
  createProduct(productInput:ProductInputData): Product!
  updateProduct(id: ID!, productInput:ProductInputData): Product!
  deleteProduct(id: ID!): Product!
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`);
