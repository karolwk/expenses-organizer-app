import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExpansesOutput from '../components/ExpensesOutput/ExpansesOutput';

const AllExpenses = () => {
  return <ExpansesOutput expensesPeriod="Total" />;
};

export default AllExpenses;

const styles = StyleSheet.create({});
