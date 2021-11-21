import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'
import { towerEventsService } from './TowerEventsService'

class AttendeesService {
  async attendEvent(body) {
    const theEvent = await towerEventsService.getEventById(body.eventId)
    const found = await dbContext.Attendee.findOne({ eventId: body.eventId, accountId: body.accountId })
    if (found) {
      throw new BadRequest('you are already attending this event')
    }
    const attend = await dbContext.Attendee.create(body)
    await attend.populate('account event')
    // logger.log(theEvent)
    theEvent.capacity--
    return attend
  }

  async getAttendeesById(id) {
    const attendee = await dbContext.Attendee.findById(id).populate('creator')
    if (!attendee) {
      throw new BadRequest('Invalid id ')
    }
    return attendee
  }

  async removeAttendee(attendeeId, userId) {
    const attendee = await this.getAttendeesById(attendeeId)
    if (attendee.creatorId.toString() !== userId) {
      throw new Forbidden('ah ah ah thats a no no')
    }
    await dbContext.Attendee.findByIdAndDelete(attendeeId)
  }

  async getMyAttendance(query = {}) {
    const myAttendance = await dbContext.TowerEvent.find(query).populate('account', 'name picture')
    if (!myAttendance) {
      throw new BadRequest('invalid id')
    }
    return myAttendance
  }
}

export const attendeesService = new AttendeesService()
