import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService{
  async getAllEvents(){
    const res = await api.get('api/events')
    // logger.log(res.data)
    AppState.events = res.data
  }
  async getActiveEvent(id){
   const res = await api.get(`api/events/${id}`)
    AppState.activeEvent = res.data
  }

  // NOTE change back to active event
  async createEvent(event){
    const res = await api.post('api/events', event)
    // logger.log(res.data)
    AppState.activeEvent = res.data
  }
  async cancelEvent(event){
    // event.isCanceled == !event.isCanceled
    await api.delete(`api/events/${event.id}`)
    AppState.events = AppState.events.filter(e => e.id !== AppState.events.id)
    this.getActiveEvent(event.id)
  }
  async editEvent(event){
    debugger
    const res = await api.put(`api/events/${event.id}`, event)
    const newEvent = res.data
    AppState.activeEvent = newEvent
    const index = AppState.events.findIndex(e => e.id === newEvent.id)
    if(index === -1){
      AppState.events.push(newEvent)
      return
    }
    AppState.events.splice(index, 1, newEvent)
  }

}

export const eventsService = new EventsService()