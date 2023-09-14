/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMain } from '../contexts/MainContext';
import DateTimePickerModal from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text'; // Import TextInputMask
import formatDateToString from '../utils/formatDateToString';
import formatStringToDate from '../utils/formatStringToDate';

function RefundsListingView() {
  const [numClientsToLoad, setNumClientsToLoad] = useState(10);
  const [nameFilter, setNameFilter] = useState('');
  const navigation = useNavigation();
  const { refunds, fetchRefunds } = useMain();

  const [filtersActive, setFiltersActive] = useState(false);

  const [startDateFilter, setStartDateFilter] = useState(new Date());
  const [endDateFilter, setEndDateFilter] = useState(new Date());
  const [showStartDateFilterPicker, setShowStartDateFilterPicker] = useState(false);
  const [showEndDateFilterPicker, setShowEndDateFilterPicker] = useState(false);
  const [startDateSelected, setStartDateSelected] = useState(false);
  const [endDateSelected, setEndDateSelected] = useState(false);

  useEffect(() => {
    fetchRefunds();
  }, []);

  useEffect(() => {
    // Check if any filter is active and set filtersActive state accordingly
    if (startDateSelected || endDateSelected || nameFilter) {
      setFiltersActive(true);
    } else {
      setFiltersActive(false);
    }
  }, [startDateSelected, endDateSelected, nameFilter]);

  const clearFilters = () => {
    setStartDateSelected(false);
    setEndDateSelected(false);
    setNameFilter('');
    setFiltersActive(false);
    setStartDateFilter(new Date());
    setEndDateFilter(new Date());
  };

  const handleLoadMore = () => {
    setNumClientsToLoad((prevNumClientsToLoad) => prevNumClientsToLoad + 5);
  };
  const handleDataRequestRefundStartChange = (event, selectedDate) => {
    setShowStartDateFilterPicker(false);
    setStartDateSelected(true);
    if (selectedDate) {
      setStartDateFilter(selectedDate);
    }
  };

  const handleDataRequestRefundEndChange = (event, selectedDate) => {
    setShowEndDateFilterPicker(false);
    setEndDateSelected(true);
    if (selectedDate) {
      setEndDateFilter(selectedDate);
    }
  };

  const filterRefunds = () => {
    const filteredRefunds = refunds.filter((refund) => {
      // Filter by name
      const nameMatch = refund.nomeCliente.toLowerCase().includes(nameFilter.toLowerCase());

      // Filter by start date
      const startDateMatch = !startDateSelected || !startDateFilter || refund.requestRefundData && formatStringToDate(refund.requestRefundData) >= startDateFilter;

      // Filter by end date
      const endDateMatch = !endDateSelected || !endDateFilter || refund.requestRefundData && formatStringToDate(refund.requestRefundData) <= endDateFilter;

      return nameMatch && startDateMatch && endDateMatch;
    });

    return filteredRefunds.slice(0, numClientsToLoad);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
          if (isCloseToBottom) {
            handleLoadMore();
          }
        }}
      >
        <View style={styles.refundsListingView}>
          {/* Filter input for Nome do Passageiro */}
          <TextInput
            style={styles.filterInput}
            placeholder="Filtrar por Nome do Passageiro"
            value={nameFilter}
            onChangeText={(text) => setNameFilter(text)}
          />

          <View style={{marginBottom: 10}}>
            <Text style={{marginBottom: 8}}>Data Inicial:</Text>
            <Button
              title={startDateSelected ? startDateFilter === '' ? 'Selecionar Data' : formatDateToString(startDateFilter) : 'Selecionar Data'}
              onPress={() => setShowStartDateFilterPicker(true)}
              color="#ef7946"
            />
            {showStartDateFilterPicker && (
              <DateTimePickerModal
                value={typeof startDateFilter === 'object' ? startDateFilter : formatStringToDate(startDateFilter)}
                mode="date"
                display="calendar"
                onChange={handleDataRequestRefundStartChange}
              />
            )}
          </View>

          <View style={{marginBottom: 16}}>
            <Text style={{marginBottom: 8}}>Data Final:</Text>
            <Button
              title={endDateSelected ? endDateFilter === '' ? 'Selecionar Data' : formatDateToString(endDateFilter) : 'Selecionar Data'}
              onPress={() => setShowEndDateFilterPicker(true)}
              color="#ef7946"
            />
            {showEndDateFilterPicker && (
              <DateTimePickerModal
                value={typeof endDateFilter === 'object' ? endDateFilter : formatStringToDate(endDateFilter)}
                mode="date"
                display="calendar"
                onChange={handleDataRequestRefundEndChange}
              />
            )}
          </View>

          {filtersActive && (
            <View style={styles.filterContainer}>
              <Button title="Limpar Filtros" onPress={clearFilters} />
            </View>
          )}

          {filterRefunds().map((client) => (
            <View
              key={client.id}
              style={styles.clientItem}
              // onPress={() => navigation.navigate('ClientDetails', { client })}
            >
              <Text style={styles.clientInfoLabel}>Nome do Cliente:</Text>
              <Text style={styles.clientInfoValue}>{client.nomeCliente}</Text>

              <Text style={styles.clientInfoLabel}>Localizador:</Text>
              <Text style={styles.clientInfoValue}>{client.localizador}</Text>

              <Text style={styles.clientInfoLabel}>Companhia Aérea:</Text>
              <Text style={styles.clientInfoValue}>{client.companhiaAerea}</Text>

              <Text style={styles.clientInfoLabel}>Data da Solicitação:</Text>
              <Text style={styles.clientInfoValue}>{client.requestRefundData}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RefundsListingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  refundsListingView: {
    flex: 1,
    padding: 20,
  },
  clientItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#e06c2b',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  clientInfoLabel: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    color: '#FFF',
  },
  clientInfoValue: {
    flex: 2,
    fontSize: 16,
    color: '#FFF',
  },
  filterInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterContainer: {
    marginTop: 8,
    marginBottom: 16
  }
});
