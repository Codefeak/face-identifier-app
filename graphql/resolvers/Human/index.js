import Human from "../../../models/Human";

export default {
  Query: {
    human: (root, args) => {
      return new Promise((resolve, reject) => {
        Human.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },

    humen: () => {
      return new Promise((resolve, reject) => {
        Human.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  
  Mutation: {
    addHuman: (root, { socialID, name, hairColor, gender, description, url }) => {
      const newHuman = new Human({
        socialID,
        name,
        hairColor,
        gender,
        description,
        url
      });
      return new Promise((resolve, reject) => {
        newHuman.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    editHuman: (root, { socialID, name, hairColor, gender, description, url }) => {
      return new Promise((resolve, reject) => {
        Human.findOneAndUpdate(
          { socialID },
          { $set: { name, hairColor, gender, description, url } }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteHuman: (root, args) => {
      return new Promise((resolve, reject) => {
        Human.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
