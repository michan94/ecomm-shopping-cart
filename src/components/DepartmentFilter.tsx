import React from 'react';
import {inject, observer} from 'mobx-react';
import DropDownPicker from 'react-native-dropdown-picker';
import DepartmentStore from '../stores/DepartmentStore';
import {Checkbox} from 'react-native-paper';
import {ScrollView, Switch, View, Text} from 'react-native';
import styled from '@emotion/native';

const DepartmentView = styled.View`
  flex-direction: column;
  align-items: center;
`;

const DepartmentFilter = observer(({listOfDepartments: {departments}}) => {
  return (
    <View>
      <ScrollView>
        {departments.map(({department, toggleActive, isActive}) => (
          <DepartmentView key={department}>
            <Text>{department}</Text>
            <Switch onValueChange={toggleActive} value={isActive} />
          </DepartmentView>
        ))}
      </ScrollView>
    </View>
  );
});

export default DepartmentFilter;
