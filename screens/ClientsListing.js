/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMain } from '../contexts/MainContext';
import { TextInputMask } from 'react-native-masked-text'; // Import TextInputMask

function ClientsListingView() {
  const [numClientsToLoad, setNumClientsToLoad] = useState(10);
  const [nameFilter, setNameFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const navigation = useNavigation();
  const { clients, fetchClients } = useMain();

  useEffect(() => {
    fetchClients();
  }, []);

  const handleLoadMore = () => {
    setNumClientsToLoad((prevNumClientsToLoad) => prevNumClientsToLoad + 5);
  };

  const filterClients = () => {
    const filteredClients = clients.filter((client) => {
      // Filter by name
      const nameMatch = client.nomePassageiro.toLowerCase().includes(nameFilter.toLowerCase());

      // Filter by start date
      const startDateMatch = !startDateFilter || client.dataVoo >= startDateFilter;

      // Filter by end date
      const endDateMatch = !endDateFilter || client.dataVoo <= endDateFilter;

      return nameMatch && startDateMatch && endDateMatch;
    });

    return filteredClients.slice(0, numClientsToLoad);
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
            placeholder="Filtrar por Nome do Passageiro"
            value={nameFilter}
            onChangeText={(text) => setNameFilter(text)}
          />

          {/* Filter input for Data do Voo (Start Date) with masking */}
          <TextInputMask
            style={styles.filterInput}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            value={startDateFilter}
            onChangeText={(formatted, extracted) => setStartDateFilter(formatted)}
            placeholder="Filtrar por Data do Voo (Data Inicial)"
          />

          {/* Filter input for Data do Voo (End Date) with masking */}
          <TextInputMask
            style={styles.filterInput}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            value={endDateFilter}
            onChangeText={(formatted, extracted) => setEndDateFilter(formatted)}
            placeholder="Filtrar por Data do Voo (Data Final)"
          />

          {filterClients().map((client) => (
            <TouchableOpacity
              key={client.id}
              style={styles.clientItem}
              onPress={() => navigation.navigate('ClientDetails', { client })}
            >
              <Text style={styles.clientInfoLabel}>Nome do Passageiro:</Text>
              <Text style={styles.clientInfoValue}>{client.nomePassageiro}</Text>

              <Text style={styles.clientInfoLabel}>Localizador:</Text>
              <Text style={styles.clientInfoValue}>{client.localizador}</Text>

              <Text style={styles.clientInfoLabel}>Companhia:</Text>
              <Text style={styles.clientInfoValue}>{client.companhiaAerea}</Text>

              <Text style={styles.clientInfoLabel}>Data do Voo:</Text>
              <Text style={styles.clientInfoValue}>{client.dataVoo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ClientsListingView;

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
});
