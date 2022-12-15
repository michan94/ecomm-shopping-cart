import {types} from 'mobx-state-tree';
import TimeAgo from 'javascript-time-ago';
// English.
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);

const TimeHelperModel = types
  .model({updatedAt: types.maybe(types.string)})
  .views((self) => ({
    get relativeTimeSince() {
      const timeAgo = new TimeAgo('en-US');
      return timeAgo.format(Date.parse(self.createdAt), 'round');
    },
  }))
  .actions((self) => ({
    saveUpdatedDate() {
      self.updatedAt = new Date().toISOString();
    },
  }));

export default TimeHelperModel;
