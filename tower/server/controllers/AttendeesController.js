import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AttendeesController extends BaseController {
  constructor() {
    super('/api/attendees')
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.attendEvent)
      .delete('/:attendeeId', this.removeAttendee)
  }

  async attendEvent(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const attended = await attendeesService.attendEvent(req.body)
      return res.send(attended)
    } catch (error) {
      next(error)
    }
  }

  async removeAttendee(req, res, next) {
    try {
      const userId = req.userInfo.id
      const attendeeId = req.params.attendeeId
      await attendeesService.removeAttendee(attendeeId, userId)
      res.send('this attendee has been removed from event')
    } catch (error) {
      next(error)
    }
  }
}
