import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('/api')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/comments', this.createComment)
      .get('/events/:eventId/comments', this.getCommentsByEvent)
      .delete('/comments/:commentId', this.removeComment)
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEvent(req, res, next) {
    try {
      const comment = await commentsService.getCommentsByEvent(req.params.eventId)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async removeComment(req, res, next) {
    try {
      const userId = req.userInfo.id
      const commentId = req.params.commentId
      await commentsService.removeComment(commentId, userId)
      res.send('this comment has been deleted ')
    } catch (error) {
      next(error)
    }
  }
}
