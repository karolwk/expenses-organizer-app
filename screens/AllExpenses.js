import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ExpansesOutput from '../components/ExpensesOutput/ExpansesOutput';
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpansesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
