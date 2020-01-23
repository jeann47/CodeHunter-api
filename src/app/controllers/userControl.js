const bcrypt = require("bcrypt");

const { user, post } = require("../models");
const { auth, adminAuth } = require("./utils");

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
    const acc = await auth(req.headers);
    const adm = await adminAuth(req.headers);

    if (id === acc) {
      attributes.push("email", "login", "notes");
    }
    if (id === adm) {
      attributes.push("createdAt", "updatedAt", "type");
    }

    const data = await user.findByPk(id, {
      attributes,
      include: post
    });
    return res.json(data);
  },

  // eslint-disable-next-line consistent-return
  async store(req, res) {
    let { name, login, password, email, type } = req.body;
    if(!type) type = false // !admin
    const User = await user.findOne({ where: { email } });

    if (!User) {
      // eslint-disable-next-line no-shadow
      await bcrypt.hash(password, 10, async (err, password) => {
        // eslint-disable-next-line no-lone-blocks
        {
          const data = await user.create({
            name,
            login,
            password,
            email,
            type
          });
          return res.json(data);
        }
      });
    } else return res.send("There is another account using this email.");
  },

  async list(req, res) {
    const data = await user.findAll({
      attributes,
      include: post
    });
    return res.json(data);
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      login,
      password,
      bio,
      email,
      techs,
      pic,
      github,
      stackOverflow,
      linkedIn,
      instagram,
      notes
    } = req.body;
    let data = null;
    if (login) {
      const User = await user.findOne({ where: { login } });
      if (!User) {
        data = await user.update({ login }, { where: { id } });
      } else res.status(350);
    }
    if (password) {
      const User = await user.findByPk(id);
      await bcrypt.compare(password, User.password).then(async check => {
        if (check) {
          res.status(350);
        } else {
          // eslint-disable-next-line no-shadow
          await bcrypt.hash(password, 10, async (err, password) => {
            // eslint-disable-next-line no-lone-blocks
            {
              data = await user.update({ password }, { where: { id } });
            }
          });
        }
      });
    }
    if (email) {
      // user info
      const User = await user.findOne({ where: { email } });
      if (!User) {
        data = await user.update({ email }, { where: { id } });
      } else res.status(350);
    }
    if (name || pic || bio || techs) {
      // user info
      data = await user.update({ name, pic, bio, techs }, { where: { id } });
    }
    if ((github, stackOverflow, linkedIn, instagram)) {
      // social info
      data = await user.update(
        { github, stackOverflow, linkedIn, instagram },
        { where: { id } }
      );
    }
    if (notes) {
      const User = await user.findByPk(id);
      if (!User.notes) {
        data = await user.update({ notes: [notes] }, { where: { id } });
      } else {
        User.notes.push(notes);
        data = await user.update({ notes: User.notes }, { where: { id } });
      }
    }
    return res.json(data);
  },

  async delete(req, res) {
    const { id } = req.params;
    const acc = await auth(req.headers);
    if (id != acc) {
      return res.status(350).send("That is not your account to delete");
    }
    const data = await user.destroy({ where: { id } });
    return res.json(data);
  }
};

// will be optimized later
