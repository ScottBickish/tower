import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class AttendeesService{
async getEventAttendees(id){
 const res = await api.get(`api/events/${id}/attendees`)
 AppState.attendees = res.data
 logger.log(res.data)
}
async attendThisEvent(accountId, eventId){
  const res = await api.post('api/attendees', {accountId: accountId, eventId: eventId})
  AppState.attendees = [...AppState.attendees, res.data]
}
}

export const attendeesService = new AttendeesService()