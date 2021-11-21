import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CommentsService {
  async createComment(body) {
    const newComment = await dbContext.Comment.create(body)
    return newComment.populate('creator')
  }

  async getCommentsByEvent(id) {
    const foundComment = await dbContext.Comment.find({ eventId: id }).populate('creator')
    if (!foundComment) {
      throw new BadRequest('this does not exist')
    }
    return foundComment
  }

  async getCommentsById(id) {
    const comment = await dbContext.Comment.findById(id).populate('creator')
    if (!comment) {
      throw new BadRequest('Invalid id ')
    }
    return comment
  }

  async removeComment(commentId, userId) {
    const comment = await this.getCommentsById(commentId)
    if (comment.creatorId.toString() !== userId) {
      throw new Forbidden('ah ah ah thats a no no')
    }
    await dbContext.Comment.findByIdAndDelete(commentId)
  }
}

export const commentsService = new CommentsService()
