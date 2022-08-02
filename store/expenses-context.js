import { createContext, useReducer } from 'react';

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
    date: new Date('2022-07-29'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data }; // marge two objects to save id atribute
      const updatableExpenses = [...state];
      updatableExpenses[updatableExpenseIndex] = updatedItem;
      return updatableExpenses;

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const updateExpense = (id, expanseData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expanseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
