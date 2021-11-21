import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TowerEventsService {
  async createEvent(body) {
    const newEvent = await dbContext.TowerEvent.create(body)
    return newEvent.populate('creator')
  }

  async getAllEvents(query = {}) {
    return await dbContext.TowerEvent.find(query).populate('creator')
  }

  async getEventById(id) {
    const Event = await dbContext.TowerEvent.findById(id).populate('creator')
    if (!Event) {
      throw new BadRequest('Invalid Id Please Revise and Resend...')
    }
    return Event
  }

  async editEvent(body) {
    const Event = await this.getEventById({ _id: body.id })
    if (Event.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('you cannot edit this event ya silly willy')
    } else if (Event.isCanceled) {
      throw new BadRequest('you cant edit a canceled event')
    }
    const newEvent = dbContext.TowerEvent.findByIdAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return newEvent
  }

  async cancelEvent(id, body, update) {
    const Event = await this.getEventById({ _id: body.id })
    if (Event.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('na')
    }
    const newEvent = await dbContext.TowerEvent.findByIdAndUpdate(id, update, { new: true })

    return newEvent
  }
}

export const towerEventsService = new TowerEventsService()
