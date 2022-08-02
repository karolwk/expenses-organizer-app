import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import ExpansesSummary from './ExpansesSummary';
import ExpansesList from './ExpansesList';
import { GlobalStyles } from '../../constants/styles';

const ExpansesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpansesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpansesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
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
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
