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
    addHuman: (root, { _id, name, hairColor, gender, description, url }) => {
      const newHuman = new Human({
        _id,
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
    editHuman: (root, { _id, name, hairColor, gender, description, url }) => {
      return new Promise((resolve, reject) => {
        Human.findOneAndUpdate(
          { _id },
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
