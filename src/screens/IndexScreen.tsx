import React from 'react';
import {FlatList, View} from 'react-native';
import {observer, inject} from 'mobx-react';
import styled from '@emotion/native';
import ItemCard from '../components/ItemCard';
import NavigationBar from '../components/NavigationBar';
import DepartmentFilter from '../components/DepartmentFilter';

// {itemStore} param is from the inject statement at bottom

const FilterContainer = styled.View`
  height: 155px;
  width: 200px;
  border-color: green;
  border-width: 5px;
  align-self: center;
  top: 50px;
`;

const IndexScreen = inject(
  'itemStore',
  'departmentStore',
  'cartItemsStore',
  'userStore',
)(
  observer(
    ({
      IndexScreen,
      itemStore: {filteredDeptItems},
      departmentStore,
      cartItemsStore: {cartItemAdd},
      userStore: {selectedUser},
    }) => {
      const renderItem = ({item}) => (
        <ItemCard
          item={item}
          addToCart={cartItemAdd}
          currentUser={selectedUser}
          itemToAdd={item}
        />
      );
      return (
        <View>
          <NavigationBar />
          <FilterContainer>
            <DepartmentFilter listOfDepartments={departmentStore} />
          </FilterContainer>
          <FlatList
            data={filteredDeptItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={{top: 50}}
          />
        </View>
      );
    },
  ),
);

// Inject from rootStore
export default IndexScreen;
