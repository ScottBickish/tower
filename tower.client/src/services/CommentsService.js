import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{
  async getEventComments(id){
    const res = await api.get(`api/events/${id}/comments`)
    AppState.comments = res.data
  }
  async createComment(comment){
    const res = await api.post('api/comments', comment)
    AppState.comments = [...AppState.comments, res.data]
  }
  async removeComment(id){
    await api.delete(`api/comments/${id}`)
    AppState.comments = AppState.comments.filter(c => c.id !== id)
    
  }

}

export const commentsService = new CommentsService()