import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeesService } from '../services/AttendeesService'
import BaseController from '../utils/BaseController'

export class AttendeesController extends BaseController {
  constructor() {
    super('/api')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/attendees', this.attendEvent)
      .delete('/:attendeeId', this.removeAttendee)
      .get('/attendees', this.getMyAttendance)
      .get('/events/:eventId/attendees', this.getEventAttendance)
  }

  // FIXME i cant figure this out passing 4/5 capacity not updating
  async attendEvent(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const attended = await attendeesService.attendEvent(req.body)
      return res.send(attended)
    } catch (error) {
      next(error)
    }
  }

  async getMyAttendance(req, res, next) {
    try {
      const query = req.query
      const attendance = await attendeesService.getMyAttendance(query)
      return res.send(attendance)
    } catch (error) {
      next(error)
    }
  }

  async getEventAttendance(req, res, next) {
    try {
      req.body.eventId = req.params.eventId
      req.body.creatorId = req.userInfo.id
      const attendance = await attendeesService.getMyAttendance({ eventId: req.body.eventId })
      return res.send(attendance)
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
