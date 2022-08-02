import { StyleSheet, View } from 'react-native';
import React from 'react';
import ExpansesSummary from './ExpansesSummary';
import ExpansesList from './ExpansesList';
import { GlobalStyles } from '../../constants/styles';

const ExpansesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpansesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpansesList expenses={expenses} />
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
