import {types} from 'mobx-state-tree';
import {ADMIN, DEFAULT} from '../constants/privilegeTypes';
import TimeHelperModel from './TimeHelperModel';

const UserModel = types
  .model({
    id: types.identifier,
    createdAt: types.maybeNull(types.safeReference(TimeHelperModel)),
    name: types.maybe(types.string),
    avatar: types.maybe(types.string),
    country: types.maybe(types.string),
    // Need to make privilege as "default" OR need to add dynamically in UserStore
    //privilege: types.enumeration("privilege", ["default", "admin"], "default")
    privilege: types.optional(types.enumeration([DEFAULT, ADMIN]), DEFAULT),
  })
  .views((self) => ({
    get isAdminViewEnabled() {
      return self.privilege === ADMIN;
    },
  }));

export default UserModel;
