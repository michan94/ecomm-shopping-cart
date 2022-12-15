import React from 'react';
import {Text, StyleSheet} from 'react-native';
import styled from '@emotion/native';
import {observer} from 'mobx-react';
import {Button, Card, Paragraph, TextInput} from 'react-native-paper';
import TimeHelperModel from '../models/TimeHelperModel';
import PropTypes from 'prop-types';

const DetailsContainer = styled.View`
  margin-top: 10px;
`;

const DetailsText = styled.Text`
  margin: 2px;
  font-size: 15px;
`;

const ItemCard = observer(
  ({
    item: {
      name,
      image,
      id,
      createdAt,
      localPrice,
      department,
      setName,
      setDepartment,
      setPrice,
      updatedAt,
    },
    addToCart,
    currentUser: {isAdminViewEnabled},
    itemToAdd,
  }) => {
    return (
      <Card style={styles.container}>
        <Card.Content>
          {isAdminViewEnabled && (
            <TextInput
              onChangeText={setName}
              value={name}
              onEndEditing={TimeHelperModel.saveUpdatedDate}
            />
          )}
          <Text>Name: {name}</Text>
          <Card.Cover source={{uri: image}} />
          <Paragraph>
            <DetailsContainer>
              <DetailsText>ID: {id}</DetailsText>
              <DetailsText>Created At: {createdAt}</DetailsText>
              {isAdminViewEnabled && (
                <>
                  <TextInput
                    onChangeText={setPrice}
                    value={localPrice}
                    onEndEditing={TimeHelperModel.saveUpdatedDate}
                  />
                  <TextInput
                    onChangeText={setDepartment}
                    value={department}
                    onEndEditing={TimeHelperModel.saveUpdatedDate}
                  />
                  <Text>Updated At: {updatedAt}</Text>
                </>
              )}
              <DetailsText>Price: {localPrice}</DetailsText>
              <DetailsText>Department: {department}</DetailsText>
            </DetailsContainer>
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => addToCart(itemToAdd)}>Add to Cart</Button>
        </Card.Actions>
      </Card>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    elevation: 100,
  },
});

ItemCard.PropTypes = {
  item: PropTypes.element,
  addToCart: PropTypes.func,
  currentUser: PropTypes.element,
};

export default ItemCard;
