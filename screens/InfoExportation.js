import React from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { useMain } from '../contexts/MainContext';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

function ExcelExportView() {
  const { clients } = useMain();

  const exportToExcel = async () => {
    if (clients.length === 0) {
      // No clients to export
      return;
    }

    const csvHeader = [
      'DataVenda',
      'CompanhiaAerea',
      'Localizador',
      'NomePassageiro',
      'NomeComprador',
      'NomeVendedor',
      'ContatoVendedor',
      'ValorCompra',
      'ValorVenda',
      'Lucro',
      'FormaPagamento',
      'ChecklistPago',
      'EmailCliente',
      'CPF'
    ];

    const csvData = clients.map(client => [
      client.dataVenda,
      client.companhiaAerea,
      client.localizador,
      client.nomePassageiro,
      client.nomeComprador,
      client.nomeVendedor,
      client.contatoVendedor,
      client.valorCompra,
      client.valorVenda,
      client.lucro,
      client.formaPagamento,
      client.checklistPagoChecked,
      client.emailCliente,
      client.cpf
    ]);
    const data = [csvHeader, ...csvData];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clients');

    // Generate a unique file name for the Excel file
    const fileName = `clients_${Date.now()}.xlsx`;
    const fileUri = FileSystem.documentDirectory + fileName;

    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

    try {
      await FileSystem.writeAsStringAsync(fileUri, wbout, { encoding: FileSystem.EncodingType.Base64 });

      if (Platform.OS === 'android') {
        const downloadUrl = fileUri;
        Sharing.shareAsync(downloadUrl);
      } else if (Platform.OS === 'ios') {
        const fileURL = `file://${fileUri}`;
        await Linking.openURL(fileURL);
      }
    } catch (error) {
      throw new Error('Error creating Excel file:' + error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.exportView}>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={exportToExcel}
          >
            <Text style={styles.exportButtonText}>Exportar Lista de Vendas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  exportView: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  exportButton: {
    backgroundColor: '#ef7946',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ExcelExportView;
