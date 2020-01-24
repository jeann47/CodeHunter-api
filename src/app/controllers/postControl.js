/* eslint-disable array-callback-return */
const { user, post } = require("../models");
// const { auth, adminAuth } = require("./utils");

const attributes = [
  "name",
  "pic",
  "bio",
  "gitHub",
  "stackOverflow",
  "linkedIn",
  "instagram",
  "techs"
];

module.exports = {
  async index(req, res) {
    const { id } = req.params;

    const Post = await post.findByPk(id, {
      include: [{ model: user, attributes, as: "user" }]
    });

    return res.json(Post);
  },

  async store(req, res) {
    const {
      userId,
      title,
      mainImg,
      images,
      texts,
      videoLink,
      tags,
      type
    } = req.body;

    const data = await post.create({
      userId,
      title,
      mainImg,
      images,
      texts,
      videoLink,
      tags,
      type
    });

    return res.json(data);
  },

  async list(req, res) {
    const Post = await post.findAll({
      include: [{ model: user, attributes, as: "user" }]
    });

    return res.json(Post);
  },

  // TODO: maybe it's better to get the user, build object and update just once.
  async update(req, res) {
    const { id } = req.params;
    const data = post.update({ ...req.body }, { where: { id } });
    return res.json(data);
  },

  async delete(req, res) {
    const { id } = req.params;

    const data = await post.destroy({ where: { id } });

    return res.json(data);
  }
};

// will be optimised later
