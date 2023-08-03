import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

function ProfitCalculatorView() {
  const [valorCompra, setValorCompra] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [descontosTaxas, setDescontosTaxas] = useState('');
  const [profit, setProfit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const calculateProfit = () => {
    if (!valorCompra || !valorVenda) {
      setModalVisible(true);
      return;
    }

    const compra = parseFloat(valorCompra);
    const venda = parseFloat(valorVenda);
    const descontos = descontosTaxas ? parseFloat(descontosTaxas) : 0;

    const calculatedProfit = venda - compra - descontos;
    setProfit(calculatedProfit);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profitCalculatorView}>
          <Text style={styles.label}>Valor da Compra:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setValorCompra(value)}
            value={valorCompra}
            keyboardType="numeric"
            placeholder="Digite o valor da compra"
          />

          <Text style={styles.label}>Valor da Venda:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setValorVenda(value)}
            value={valorVenda}
            keyboardType="numeric"
            placeholder="Digite o valor da venda"
          />

          <Text style={styles.label}>Descontos/Taxas:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setDescontosTaxas(value)}
            value={descontosTaxas}
            keyboardType="numeric"
            placeholder="Digite o valor dos descontos/taxas (opcional)"
          />

          <TouchableOpacity style={styles.calculateButton} onPress={calculateProfit}>
            <Text style={styles.calculateButtonText}>Calcular</Text>
          </TouchableOpacity>

          {profit !== null && (
            <View style={styles.profitResult}>
              <Text style={styles.profitResultLabel}>Lucro:</Text>
              <Text style={styles.profitResultValue}>{profit >= 0 ? profit.toFixed(2) : '0.00'}</Text>

              <Text style={styles.profitResultLabel}>Prejuízo:</Text>
              <Text style={styles.profitResultValue}>{profit < 0 ? (profit * -1).toFixed(2) : '0.00'}</Text>
            </View>
          )}

          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalMessage}>Por favor, insira o Valor da Compra e o Valor da Venda.</Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profitCalculatorView: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  calculateButton: {
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  profitResult: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  profitResultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  profitResultValue: {
    fontSize: 16,
    marginBottom: 10,
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
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfitCalculatorView;
