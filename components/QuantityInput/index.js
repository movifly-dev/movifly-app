/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuantityInput = ({ label, initialValue, onChangeQuantity }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  },[initialValue]);

  const increment = () => {
    setValue((prevValue) => prevValue + 1);
    onChangeQuantity(value + 1);
  };

  const decrement = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
      onChangeQuantity(value - 1);
    }
  };

  return (
    <View style={styles.quantityContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={decrement} disabled={value <= 0} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity onPress={increment} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ef7946',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default QuantityInput;
