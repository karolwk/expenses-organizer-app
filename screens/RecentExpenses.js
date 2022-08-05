import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ExpansesOutput from '../components/ExpensesOutput/ExpansesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    //We shouldn't make useEffect async because it's not supoused to return promise

    const getExpenses = async () => {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expensesContext.setExpenses(expenses);
    };

    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesContext.expenses.filter((expense) => {
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
