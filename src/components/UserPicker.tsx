import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {inject, observer} from 'mobx-react';
import styled from '@emotion/native';

const PickerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const UserPicker = inject('userStore')(
  observer(({userStore: {setSelectedUser, pickerAllUsers}}) => {
    return (
      <PickerContainer>
        <RNPickerSelect
          items={pickerAllUsers}
          onValueChange={(user) => setSelectedUser(user)}
          style={{inputAndroid: {color: 'black'}}}
        />
      </PickerContainer>
    );
  }),
);

export default UserPicker;
