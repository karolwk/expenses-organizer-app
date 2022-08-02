import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpenses = ({ route, navigation }) => {
  // With "?" after params we check if params are undefined
  // if yes then we don't look up for another value in it
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; // Another JS trick to convert value to boolean

  const expneseCtx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    // Seting title dynamicly
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpeneseHanlder = () => {
    expneseCtx.deleteExpense(editedExpenseId);
    navigation.goBack(); // Go back to screen that opened this screen
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEditing) {
      expneseCtx.updateExpense(editedExpenseId, {
        description: 'TestUpdate',
        amount: 29.99,
        date: new Date('2022-07-29'),
      });
    } else {
      expneseCtx.addExpense({
        description: 'Test',
        amount: 19.99,
        date: new Date('2022-07-28'),
      });
    }
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
