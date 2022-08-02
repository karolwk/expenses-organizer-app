import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ExpansesOutput from '../components/ExpensesOutput/ExpansesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7); // this will get us date from 7 days ago

    return expense.date > date7DaysAgo;
  });
  return (
    <ExpansesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registred por last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
