import React from 'react';
import {Text, View, image, StyleSheet} from 'react-native';
import styled from '@emotion/native';
import {inject, observer} from 'mobx-react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import PropTypes from 'prop-types';

const DetailsContainer = styled.View`
  margin-top: 60px;
`;

const DetailsText = styled.Text`
  margin: 2px;
  font-size: 15px;
`;

const CartItemCard = observer(
  ({
    CartItemCard,
    item: {name, id, createdAt, localPrice, department},
    deleteFromCart,
    itemToDelete,
  }) => {
    return (
      <Card style={styles.container}>
        <Card.Content>
          <Title>{name}</Title>
          <Paragraph>
            <DetailsContainer>
              <DetailsText>ID: {id}</DetailsText>
              <DetailsText>item.id is: {id}</DetailsText>
              <DetailsText>Created At: {createdAt}</DetailsText>
              <DetailsText>Cost: {localPrice}</DetailsText>
              <DetailsText>Department: {department}</DetailsText>
            </DetailsContainer>
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => deleteFromCart(itemToDelete)}>Delete</Button>
        </Card.Actions>
      </Card>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

CartItemCard.PropTypes = {
  item: PropTypes.element,
  deleteFromCart: PropTypes.func,
};

export default CartItemCard;
