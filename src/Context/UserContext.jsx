import React, { createContext, useState, useContext, useEffect } from 'react';
import {db} from "../components/Services/Service";
import { doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';



// Crear el contexto
const UserContext = createContext();

// Hook personalizado para usar el contexto
export const useUser = () => useContext(UserContext);

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    
  }, []);

  const signIn = (userData) => {
    setUser(userData);
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    localStorage.setItem('id',userData.id);

  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  };


  const updateData = async (newData) => {
    const id = localStorage.getItem('id');
    const updatedUser = { ...user, balanceAnual: [{ ...user.balanceAnual[0], data: newData }] };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    //const userId = user.uid;

    try {
      const userDoc = doc(db, 'users', id);
      await updateDoc(userDoc, userDoc.balanceAnual = updatedUser );
      Swal.fire("Cambios guardados")
    } catch (error) {
      Swal.fire('Error', 'Error al actualizar los datos en Firebase', 'error');
    }
  };

  const editCategory = (index, newCategory) => {
    const newData = [...user.balanceAnual[0].data];
    newData[index].category = newCategory;
    updateData(newData);
  };

  const deleteCategory = (index) => {
    const newData = [...user.balanceAnual[0].data];
    newData.splice(index, 1);
    updateData(newData);
  };



  const updateExpense = (newData) => {
    updateData(newData);
    
  };

  const addCategory = (newCategory,months) => {
    const ingresosIndex = user.balanceAnual[0].data.findIndex(item => item.category === "INGRESOS");

    if (ingresosIndex !== -1) {
      const newCategoryExpenses = months.map(month => ({ month, "amount": 0 }));
      const newData = [
        ...user.balanceAnual[0].data.slice(0, ingresosIndex),
        { category: newCategory, expenses: newCategoryExpenses },
        ...user.balanceAnual[0].data.slice(ingresosIndex)
      ];
      updateData(newData);
    } else {
      // Si no se encuentra la categoría "ingresos", simplemente agregar la nueva categoría al final
      const newCategoryExpenses = months.map(month => ({ month, "amount": 0 }));
      const newData = [...user.balanceAnual[0].data, { category: newCategory, expenses: newCategoryExpenses }];
      updateData(newData);
    }
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut, editCategory, deleteCategory, updateExpense, addCategory }}>
      {children}
    </UserContext.Provider>
  );
};
