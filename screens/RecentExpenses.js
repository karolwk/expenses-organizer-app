import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExpansesOutput from '../components/ExpensesOutput/ExpansesOutput';

const RecentExpenses = () => {
  return <ExpansesOutput expensesPeriod="Last 7 days" />;
};

export default RecentExpenses;

const styles = StyleSheet.create({});
