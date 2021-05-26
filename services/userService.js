const Service = require('../model/service');

class UserService extends Service {
  constructor() {
    super();
  }

  async CreateUser(user) {
    try {
      const {
        userId,
        userPhone,
        firstName,
        lastName,
        userBirthday,
        additionalComments,
      } = user;
      const id = parseInt(userId);
      const phone = parseInt(userPhone);

      const newUser = await this.pool.query(
        `INSERT INTO users (user_id, phone, first_name, last_name, birthday, additional_comments)
				VALUES($1,$2,$3,$4,$5,$6)
				ON CONFLICT DO NOTHING RETURNING *`,
        [id, userPhone, firstName, lastName, userBirthday, additionalComments]
      );
      if (newUser) {
        console.log(`services/UserService/CreateUser: Inserted new user successfully! userId: ${userId}, userPhone: ${userPhone}, firstName: ${firstName},
				 lastName: ${lastName}, birthday: ${userBirthday}, additionalComments: ${additionalComments}`);
      }
      return true;
    } catch (err) {
      console.log(
        `services/UserService/CreateUser failed! cannot insert new user!`,
        err
      );
      return false;
    }
  }

  async findUserById(userId) {
    try {
      const user = await this.pool.query(
        `SELECT * FROM users WHERE user_id = $1`,
        [userId]
      );
      if (user) {
        console.log(`services/UserService/findUserById: Returened user returned successfully! : user's first name: ${user.firstName} 
				, user's last name: ${user.lastName}, user's phone: ${user.phone}, user's birthday: ${user.userBirthday}, additionalComments ${user.additionalComments}.`);
      }
      return user.rows;
    } catch (err) {
      console.log(
        `services/UserService/findUserById failed! cannot insert new user!`,
        err
      );
      return false;
    }
  }

  async findUserByPhoneNumber(userPhone) {
    try {
      const user = await this.pool.query(
        `SELECT * FROM users WHERE phone = $1`,
        [userPhone]
      );
      if (user) {
        console.log(`services/UserService/findUserByPhoneNumber: Returened user returned successfully! : user's first name: ${user.firstName} 
				, user's last name: ${user.lastName}, user's phone: ${user.phone}, user's birthday: ${user.userBirthday}, additionalComments ${user.additionalComments}.`);
      }
      return user.rows;
    } catch (err) {
      console.log(
        `services/UserService/findUserByPhoneNumber failed! cannot insert new user!`,
        err
      );
      return false;
    }
  }
}

module.exports = UserService;
