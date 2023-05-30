const Product = require('../models/product');
const Review = require('../models/reviews');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql');

// Project Type
const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    color: { type: GraphQLString },
    size: { type: GraphQLString },
    material: { type: GraphQLString },
    brand: { type: GraphQLString },
    weight: { type: GraphQLInt },
    availibiliy: { type: GraphQLBoolean },
    image: { type: GraphQLString },
    categoryId: { type: GraphQLID },
    launchDate: { type: GraphQLString },
    reviews: {
      type: ReviewType,
      async resolve(parent, args) {
        return await Review.findOne({ productId: new ObjectId(parent._id) });
        console.log(data, '===========');
        return { data: data };
      },
    },
  }),
});

// Client Type
const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    productId: { type: GraphQLID },
    rating: { type: GraphQLFloat },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    author: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      args: { text: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log('args', args);
        const products = await Product.find({ $text: { $search: args.text } });

        return products.map((q) => {
          return {
            ...q._doc,
            _id: q._id.toString(),
          };
        });
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Review.find({ productId: new ObjectId(args.id) });
      },
    },
    // client: {
    //   type: ReviewType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return Client.findById(args.id);
    //   },
    // },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a client
    addClient: {
      type: ReviewType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
    // Delete a client
    deleteClient: {
      type: ReviewType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.deleteOne();
          });
        });

        return Client.findByIdAndRemove(args.id);
      },
    },
    // Add a project
    addProject: {
      type: ProductType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },
    // Delete a project
    deleteProject: {
      type: ProductType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    // Update a project
    updateProject: {
      type: ProductType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
