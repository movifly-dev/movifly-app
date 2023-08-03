/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useMain } from '../contexts/MainContext';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; // Import expo-sharing

function ModalMessage({ isVisible, message, onClose, onSettingsPress }) {
  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalMessageText}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={[styles.modalButton, styles.okButton]}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSettingsPress} style={[styles.modalButton, styles.settingsButton]}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function InfoExportationView() {
  const { clients } = useMain();
  const [isWritePermissionGranted, setIsWritePermissionGranted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await FileSystem.getPermissionsAsync();
      setIsWritePermissionGranted(status === 'granted');
    };

    checkPermissions();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openAppSettings = async () => {
    // ... (No need for app settings related to Media Library)
  };

  const exportToCSV = async () => {
    if (!isWritePermissionGranted) {
      const { status } = await FileSystem.requestPermissionsAsync();
      setIsWritePermissionGranted(status === 'granted');
      if (status !== 'granted') {
        showModal();
        return;
      }
    }
    if (clients.length === 0) {
      return; // No clients to export
    }

    const csvHeader = 'Id,DataVenda,CompanhiaAerea,Localizador,NomePassageiro,NomeComprador,NomeVendedor,ContatoVendedor,ValorCompra,ValorVenda,Lucro,FormaPagamento,ChecklistPago,EmailCliente,CPF\n';
    const csvData = clients.map((client) => `${client.id},${client.dataVenda},${client.companhiaAerea},${client.localizador},${client.nomePassageiro},${client.nomeComprador},${client.nomeVendedor},${client.contatoVendedor},${client.valorCompra},${client.valorVenda},${client.lucro},${client.formaPagamento},${client.checklistPago},${client.emailCliente},${client.cpf}\n`).join('');

    const csvContent = csvHeader + csvData;

    try {
      const fileUri = FileSystem.documentDirectory + 'clients.csv';

      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      console.log('CSV file created:', fileUri);

      // Share the file using expo-sharing
      const sharingAvailable = await Sharing.isAvailableAsync();
      if (sharingAvailable) {
        await Sharing.shareAsync(fileUri);
      } else {
        throw new Error('Error criando/baixando arquivo');
      }

    } catch (error) {
      throw new Error('Erro ao criar/baixar arquivo: ' + error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoExportationView}>
          <TouchableOpacity style={styles.exportButton} onPress={exportToCSV}>
            <Text style={styles.exportButtonText}>Exportar Clientes</Text>
          </TouchableOpacity>
        </View>
        <ModalMessage
          isVisible={isModalVisible}
          message="Write permission not granted. Please grant the permission in the app settings to export the CSV file."
          onClose={closeModal}
          onSettingsPress={openAppSettings}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoExportationView: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  exportButton: {
    backgroundColor: '#007BFF',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMessageText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  okButton: {
    backgroundColor: '#007BFF',
  },
  settingsButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default InfoExportationView;
