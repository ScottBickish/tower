import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
// import { logger } from '../utils/Logger'
import { towerEventsService } from './TowerEventsService'
import { commentsService } from './CommentsService'

class AttendeesService {
  async attendEvent(body) {
    // body is a new attendee it has eventId and accountId
    const attend = await dbContext.Attendee.create(body)
    // populate adds the account properties and the event properties to the body when it gets sent back to the client
    await attend.populate('account event')
    // sent to update the events capacity by reducing it by one
    await towerEventsService.capacity(body.eventId)
    // stretch goal can add an icon if attending an event

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
    const myAttendance = await dbContext.Attendee.find(query).populate('event', 'name picture')

    return myAttendance
  }
}

export const attendeesService = new AttendeesService()
