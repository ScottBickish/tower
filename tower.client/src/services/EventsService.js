import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService{
  async getAllEvents(){
    const res = await api.get('api/events')
    logger.log(res.data)
    AppState.events = res.data
  }
  async getActiveEvent(id){
   const res = await api.get(`api/events/${id}`)
    AppState.activeEvent = res.data
  }

  // NOTE change back to active event
  async createEvent(event){
    const res = await api.post('api/events', event)
    logger.log(res.data)
    AppState.activeEvent = res.data
  }

}

export const eventsService = new EventsService()