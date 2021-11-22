import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { attendeesService } from '../services/AttendeesService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/attendees', this.getMyAttendance)
  }

  async getMyAttendance(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const attendance = await attendeesService.getMyAttendance({ accountId: accountId })
      return res.send(attendance)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
