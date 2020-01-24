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

  async store(req, res) {
    const { name, login, password, email, type } = req.body;
    const User = await user.findOne({ where: { email } });

    if (User) {
      return res.send("There is another account using this email.");
    }

    // eslint-disable-next-line no-shadow
    return bcrypt.hash(password, 10, async (err, password) => {
      const data = await user.create({
        name,
        login,
        password,
        email,
        type: type || false
      });

      return res.json(data);
    });
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

    let userData = {
      name,
      pic,
      bio,
      techs,
      github,
      stackOverflow,
      linkedIn,
      instagram
    }; // the front end will let them autocompleted, those way the user doesnt need to write all again to change a single part

    if (login) {
      const User = await user.findOne({ where: { login } });
      if (User) {
        return res.status(401).send("This user is already taken");
      } else {
        userData = { ...userData, login };
      }
    }
    if (password) {
      const User = await user.findByPk(id);
      await bcrypt.compare(password, User.password).then(async check => {
        if (check) {
          return res.status(401).send("Inform a different password");
        } else {
          // eslint-disable-next-line no-shadow
          await bcrypt.hash(password, 10, async (err, password) => {
            userData = { ...userData, password };
          });
        }
      });
    }

    if (email) {
      // user info
      const User = await user.findOne({ where: { email } });
      if (User) {
        return res
          .status(401)
          .send("There is another account using this email");
      } else {
        userData = { ...userData, email };
      }
    }

    if (notes) {
      const User = await user.findByPk(id);
      if (!User.notes) {
        userData = { ...userData, notes: [notes] };
      } else {
        User.notes.push(notes);
        userData = { ...userData, notes };
      }
    }

    const data = user.update({ ...userData }, { where: { id } });
    return data
      ? res.status(200).send("Updated!")
      : res.status(401).send("Failed!");
  },

  async delete(req, res) {
    const { id } = req.params;
    const acc = await auth(req.headers);

    // eslint-disable-next-line eqeqeq
    if (id != acc) {
      return res.status(401).send("That is not your account to delete");
    }

    const data = await user.destroy({ where: { id } });

    return res.json(data);
  }
};

// will be optimized later
