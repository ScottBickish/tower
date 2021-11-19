import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TowerEventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: 'no description provided' },
  coverImg: { type: String, default: 'no coverImg provided' },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, default: 'To Be Determined' },
  isCanceled: { type: Boolean },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }

}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
