const jwt = require(`jsonwebtoken`);
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

module.exports = (app, db) => {
  app.get("/test", async (req, res) =>
    res.json(await db.manyOrNone("select * from love_user"))
  );

  app.post("/api/signUp", async (req, res) => {
    const { username, password } = req.body;

    try {
      // find a user using username
      const findUser = await db.oneOrNone(
        `SELECT * FROM love_user WHERE username= $1`,
        [username]
      );

      // !null throw error
      if (findUser != null) {
        throw Error(`User already exists`);
      }

      // result => result == null
      // - null -> user doesnt exist in db ->
      // 1. hash user password -> hashed password to be added to db
      //  if(findUser == null){
      const pass = await bcrypt.hash(password, 10);

      // }

      //  2. insert user details return success
      // - if not null - user exist -> redirect to login (client)
      await db.none(
        `INSERT INTO love_user (username, password) VALUES ($1,$2)`,
        [username, pass]
      );
      res.status(200).json({
        message: "User created",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: error.message,
      });
    }
  });

  app.post("/api/logIn", async function (req, res) {
    try {
      const { username, password } = req.body;

      const findUser = await db.oneOrNone(
        `SELECT * FROM love_user WHERE username= $1`,
        [username]
      );

      console.log({findUser, username});


      if (!findUser) {
        // key == null
        throw Error(`The user doesn't exist`);
      }
      const isValid = await bcrypt.compare(password, findUser.password);
      if (!isValid) {
        throw Error(`The user doesn't exist`);
      }

      let token = jwt.sign(findUser, `secretKey`, { expiresIn: `24h` });

      res.status(200).json({
        message: "You are logged in",
        token,
        user: findUser,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  });

  // app.post("/api/love_user", async function (req, res) {
  //   const { username, password } = req.body;

  //   const countData = await db.oneOrNone(
  //     `SELECT username,password FROM love_user WHERE username= $1 AND password= $2`,
  //     [username, password]
  //   );

  //   await db.none(
  //     `INSERT INTO love_user (username, password) VALUES ($1,$2) on conflict do nothing`,
  //     [username, password]
  //   );

  //   // let key = jwt.sign(countData, `secretKey`, { expiresIn: `24h` });

  //   res.json({
  //     data: countData,
  //   });
  // });
};
