import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { AttendeeSchema } from '../models/Attendee'
import { CommentSchema } from '../models/Comment'
import { TowerEventSchema } from '../models/TowerEvent'
import { ValueSchema } from '../models/Value'

class DbContext {
  TowerEvent = mongoose.model('TowerEvent', TowerEventSchema);
  Attendee = mongoose.model('Attendee', AttendeeSchema);
  Comment = mongoose.model('Comment', CommentSchema);
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
