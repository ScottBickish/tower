import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  body: { type: String }

}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

CommentSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'TowerEvent'
})
