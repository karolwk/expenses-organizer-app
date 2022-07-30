import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExpenseItem from './ExpenseItem';

const renderExpenseItem = (itemData) => <ExpenseItem {...itemData.item} />;

const ExpansesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpansesList;

const styles = StyleSheet.create({});
