const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

// GraphQL Schema

const schema = buildSchema(`
    type Query {
        course(socialID: Int!): Course
        courses(topic: String): [Course]
    },
    type Mutation {
        updateCourseTopic(socialID: Int!, topic: String!): Course
    },
    type Course {
        socialID: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

const coursesData = [
  {
    socialID: 1,
    title: "The Complete Node.js Developer Course",
    author: "Andrew Mead, Rob Percival",
    description:
      "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs/"
  },
  {
    socialID: 2,
    title: "Node.js, Express & MongoDB Dev to Deployment",
    author: "Brad Traversy",
    description:
      "Learn by example building & deploying real-world Node.js applications from absolute scratch",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/"
  },
  {
    socialID: 3,
    title: "JavaScript: Understanding The Weird Parts",
    author: "Anthony Alicea",
    description:
      "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
    topic: "JavaScript",
    url: "https://codingthesmartway.com/courses/understand-javascript/"
  }
];

const getCourse = function(args) {
  const socialID = args.socialID;
  return coursesData.filter(course => {
    return (course.socialID = socialID);
  })[0];
};

const getCourses = function(args) {
  if (args.topic) {
    const topic = args.topic;
    return coursesData.filter(course => course.topic === topic);
  } else {
    return coursesData;
  }
};
const updateCourseTopic = function({ socialID, topic }) {
  coursesData.map(course => {
    if (course.socialID === socialID) {
      course.topic = topic;
      return course;
    }
  });
  return coursesData.filter(course => course.socialID === socialID)[0];
};

const root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic
};

// Create an express server and a graphql endpoint

const app = express();
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () => console.log("Server running on port 4000"));
