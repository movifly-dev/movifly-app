/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMain } from '../contexts/MainContext';
import DateTimePickerModal from '@react-native-community/datetimepicker';
import formatDateToString from '../utils/formatDateToString';
import formatStringToDate from '../utils/formatStringToDate';

function PendingQuotesListingView() {
  const [numClientsToLoad, setNumClientsToLoad] = useState(10);
  const [nameFilter, setNameFilter] = useState('');
  const navigation = useNavigation();
  const { quotes, fetchQuotes } = useMain();

  const [startDateFilter, setStartDateFilter] = useState(new Date());
  const [endDateFilter, setEndDateFilter] = useState(new Date());
  const [showStartDateFilterPicker, setShowStartDateFilterPicker] = useState(false);
  const [showEndDateFilterPicker, setShowEndDateFilterPicker] = useState(false);
  const [startDateSelected, setStartDateSelected] = useState(false);
  const [endDateSelected, setEndDateSelected] = useState(false);

  const [filtersActive, setFiltersActive] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleLoadMore = () => {
    setNumClientsToLoad((prevNumClientsToLoad) => prevNumClientsToLoad + 5);
  };
  const handleDataVooStartChange = (event, selectedDate) => {
    setShowStartDateFilterPicker(false);
    setStartDateSelected(true);
    if (selectedDate) {
      setStartDateFilter(selectedDate);
    }
  };

  const handleDataVooEndChange = (event, selectedDate) => {
    setShowEndDateFilterPicker(false);
    setEndDateSelected(true);
    if (selectedDate) {
      setEndDateFilter(selectedDate);
    }
  };

  useEffect(() => {
    // Check if any filter is active and set filtersActive state accordingly
    if (startDateSelected || endDateSelected || nameFilter) {
      setFiltersActive(true);
    } else {
      setFiltersActive(false);
    }
  }, [startDateSelected, endDateSelected, nameFilter]);

  const filterQuotes = () => {
    const filteredClients = quotes.filter((quote) => {
      // Filter by name
      const nameMatch = quote.solicitante.toLowerCase().includes(nameFilter.toLowerCase());

      // Filter by start date
      const startDateMatch = !startDateSelected || !startDateFilter || quote.dataIda && formatStringToDate(quote.dataIda) >= startDateFilter;

      // Filter by end date
      const endDateMatch = !endDateSelected || !endDateFilter || quote.dataIda && formatStringToDate(quote.dataIda) <= endDateFilter;

      return nameMatch && startDateMatch && endDateMatch;
    });

    return filteredClients.slice(0, numClientsToLoad);
  };

  const clearFilters = () => {
    setStartDateSelected(false);
    setEndDateSelected(false);
    setNameFilter('');
    setFiltersActive(false);
    setStartDateFilter(new Date());
    setEndDateFilter(new Date());
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
        <View style={styles.clientsListingView}>
          {/* Filter input for Nome do Passageiro */}
          <TextInput
            style={styles.filterInput}
            placeholder="Filtrar por Nome do Solicitante"
            value={nameFilter}
            onChangeText={(text) => setNameFilter(text)}
          />

          <View style={{marginBottom: 10}}>
            <Text style={{marginBottom: 8}}>Data Inicial de Ida:</Text>
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
                onChange={handleDataVooStartChange}
              />
            )}
          </View>

          <View style={{marginBottom: 16}}>
            <Text style={{marginBottom: 8}}>Data Final de Ida:</Text>
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
                onChange={handleDataVooEndChange}
              />
            )}

            {filtersActive && (
              <View style={styles.filterContainer}>
                <Button title="Limpar Filtros" onPress={clearFilters} />
              </View>
            )}
          </View>

          {filterQuotes().map((quote) => (
            <TouchableOpacity
              key={quote.id}
              style={styles.clientItem}
              onPress={() => navigation.navigate('QuoteDetails', { quote })}
            >
              <Text style={styles.clientInfoLabel}>Origem:</Text>
              <Text style={styles.clientInfoValue}>{quote.origem}</Text>

              <Text style={styles.clientInfoLabel}>Destino:</Text>
              <Text style={styles.clientInfoValue}>{quote.destino}</Text>

              <Text style={styles.clientInfoLabel}>Solicitante:</Text>
              <Text style={styles.clientInfoValue}>{quote.solicitante}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PendingQuotesListingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  clientsListingView: {
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
    marginTop: 24,
  }
});
