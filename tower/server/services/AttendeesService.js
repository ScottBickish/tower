import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'
import { towerEventsService } from './TowerEventsService'
import { commentsService } from './CommentsService'

class AttendeesService {
  async attendEvent(body) {
    const attend = await dbContext.Attendee.create(body)
    await attend.populate('account event')

    const theEvent = await towerEventsService.capacity(body.eventId)
    await commentsService.isAttending(body.eventId, true)

    theEvent.capacity--
    return attend
  }

  async getEventAttendance(query = {}) {
    const events = await dbContext.Attendee.find(query)
      .populate('account event')
    return events
  }

  async getAttendeesById(id) {
    const attendee = await dbContext.Attendee.findById(id).populate('creator')
    if (!attendee) {
      throw new BadRequest('Invalid id ')
    }
    return attendee
  }

  async removeAttendee(attendeeId, userId) {
    const found = await dbContext.Attendee.findById(attendeeId)
    if (found.accountId.toString() !== userId) {
      throw new Forbidden('invalid entry')
    }
    await dbContext.Attendee.findByIdAndDelete(attendeeId)
    await towerEventsService.capacitydown(found.eventId)
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
