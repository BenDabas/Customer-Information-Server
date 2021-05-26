const Controller = require('../../../model/controller');
const UserService = require('../../../services/userService');

class UserController extends Controller {
  constructor() {
    super();
    this.userRouter = this.getRouter();
    this.userService = new UserService();
    this.setRoutes();
  }

  async createUser(req, res) {
    try {
      const {
        userId,
        userPhone,
        firstName,
        lastName,
        userBirthday,
        additionalComments,
      } = req.body;
      const user = {
        userId,
        userPhone,
        firstName,
        lastName,
        userBirthday,
        additionalComments,
      };
      const isCreated = await this.userService.CreateUser(user);
      if (isCreated) {
        console.log('UserController/createUser success!');
        res.status(200).json(isCreated);
      }
    } catch (err) {
      console.log('UserController/createUser failed!');
      res.status(400).json({ code: err.code, message: err.message });
    }
  }

  async findUserById(req, res) {
    try {
      const { id } = req.params;
      const idNumber = Number(id);
      const user = await this.userService.findUserById(idNumber);
      if (user) {
        console.log(
          `api/Users/users/findUserById successfuly! Returned ${user.lenght}`
        );
      } else {
        console.log('api/Users/users/findUserById Could not find user');
      }
      res.status(200).json(user);
    } catch (err) {
      console.log('api/Users/users/findUserById Error', err);
      res.status(400).json({ code: err.code, message: err.message });
    }
  }

  async findUserByPhoneNumber(req, res) {
    try {
      const { phone } = req.params;
      const phoneNumber = Number(phone);
      const user = await this.userService.findUserByPhoneNumber(phoneNumber);
      if (user) {
        console.log(
          `api/Users/users/findUserByPhoneNumber successfuly! Returned ${user.lenght}`
        );
      } else {
        console.log(
          'api/Users/users/findUserByPhoneNumber Could not find user'
        );
      }
      res.status(200).json(user);
    } catch (err) {
      console.log('api/Users/users/findUserByPhoneNumber Error', err);
      res.status(400).json({ code: err.code, message: err.message });
    }
  }

  setRoutes() {
    try {
      this.userRouter.post('/create', this.createUser.bind(this));
      this.userRouter.get('/find-user-by-id/:id', this.findUserById.bind(this));
      this.userRouter.get(
        '/find-user-by-phone-number/:phone',
        this.findUserByPhoneNumber.bind(this)
      );
    } catch (err) {
      console.log('err', err);
    }
  }

  getRouterInstance() {
    return this.userRouter;
  }
}

const userController = new UserController();
const userRoutes = userController.getRouterInstance();

module.exports = userRoutes;
