import { StyleSheet, View } from 'react-native';
import React from 'react';
import ExpansesSummary from './ExpansesSummary';
import ExpansesList from './ExpansesList';
import { GlobalStyles } from '../../constants/styles';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'game',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'car toy',
    amount: 60.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'lego set',
    amount: 213.19,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'book',
    amount: 14.99,
    date: new Date('2021-02-11'),
  },
  {
    id: 'e5',
    description: 'DVD Movie',
    amount: 19.59,
    date: new Date('2021-02-18'),
  },
];

const ExpansesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpansesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpansesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpansesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
