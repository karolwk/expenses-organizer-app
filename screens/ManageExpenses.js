import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpenses = ({ route, navigation }) => {
  const [isSumbmitting, setIsSumbmitting] = useState(false);
  const [error, setError] = useState();
  const expneseCtx = useContext(ExpensesContext);
  // With "?" after params we check if params are undefined
  // if yes then we don't look up for another value in it
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; // Another JS trick to convert value to boolean
  const selectedExpense = expneseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    // Seting title dynamicly
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpeneseHanlder = async () => {
    setIsSumbmitting(true);

    try {
      expneseCtx.deleteExpense(editedExpenseId);
      await deleteExpense(editedExpenseId); // Delete remotly
      navigation.goBack(); // Go back to screen that opened this screen
    } catch (error) {
      setError('Could not delete expense - plaease try again later');
      setIsSumbmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsSumbmitting(true);

    try {
      if (isEditing) {
        expneseCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData); // we are using await to close the modal after remote update
      } else {
        const id = await storeExpense(expenseData);
        expneseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not update expense - please try again later');
      setIsSumbmitting(false);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isSumbmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSumbmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpeneseHanlder}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
