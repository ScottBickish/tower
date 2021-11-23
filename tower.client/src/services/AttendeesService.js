import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { accountService } from "./AccountService"
import { api } from "./AxiosService"
import { eventsService } from "./EventsService"


class AttendeesService{
async getEventAttendees(id){
 const res = await api.get(`api/events/${id}/attendees`)
 AppState.attendees = res.data
}
async attendThisEvent(accountId, eventId){
  const res = await api.post('api/attendees', {accountId: accountId, eventId: eventId})
  AppState.attendees = [...AppState.attendees, res.data]
  eventsService.getActiveEvent(eventId)
}
async returnTicket(attendeeId){
await api.delete(`api/attendees/${attendeeId}`)
// AppState.attendees = AppState.attendees.filter(m => m.id !== AppState.attendees.id)
accountService.getMyAttendance(attendeeId)
}

}

export const attendeesService = new AttendeesService()