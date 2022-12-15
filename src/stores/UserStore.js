import {types, flow} from 'mobx-state-tree';
import UserModel from '../models/UserModel';
import jsonServer from '../api/jsonServer';

const UserStore = types
  .model('UserStore', {
    users: types.array(UserModel),
    selectedUser: types.maybeNull(types.safeReference(UserModel)),
  })
  .actions((self) => ({
    afterCreate: flow(function* () {
      try {
        yield self.getUsers();
        self.setSelectedUser(self.users[1]); //Set initial user as Kenton Johns
        console.log(
          `Selected User is Admin: ${self.selectedUser.isAdminViewEnabled}`,
        );
      } catch (err) {
        console.error('Error getting Users');
      }
    }),
    getUsers: flow(function* () {
      try {
        const now = new Date();
        const response = yield jsonServer.get('/users');
        console.log('Response Data: ' + [...response.data]);
        self.users = [
          UserModel.create({
            id: '1000',
            createdAt: now.toString(), // right now
            name: 'Admin',
            avatar:
              'https://i.kym-cdn.com/photos/images/newsfeed/000/744/400/8d2.jpg',
            country: 'Canada',
            privilege: 'admin',
          }),
          ...response.data,
        ];
      } catch (err) {
        console.error('Error getting users');
      }
    }),
    setSelectedUser(selectedUser) {
      self.selectedUser = selectedUser;
      console.log(`Selected User: ${self.selectedUser}`);
    },
  }))
  .views((self) => {
    return {
      get pickerAllUsers() {
        const allUsers = [];
        self.users.map((user) => {
          allUsers.push({label: user.name, value: user.id});
        });
        return allUsers;
      },
    };
  });

export default UserStore;
