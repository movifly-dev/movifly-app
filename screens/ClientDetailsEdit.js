/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig';
import { updateDoc, collection, doc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import { useMain } from '../contexts/MainContext';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';

function ClientDetailsEdit({ isVisible, client, closeModal }) {
  const [dataVoo, setDataVoo] = useState(client.dataVoo);
  const [dataVenda, setDataVenda] = useState(client.dataVenda);
  const [companhiaAerea, setCompanhiaAerea] = useState(client.companhiaAerea);
  const [localizador, setLocalizador] = useState(client.localizador);
  const [nomePassageiro, setNomePassageiro] = useState(client.nomePassageiro);
  const [nomeComprador, setNomeComprador] = useState(client.nomeComprador);
  const [nomeVendedor, setNomeVendedor] = useState(client.nomeVendedor);
  const [contatoVendedor, setContatoVendedor] = useState(client.contatoVendedor);
  const [valorCompra, setValorCompra] = useState(client.valorCompra);
  const [valorVenda, setValorVenda] = useState(client.valorVenda);
  const [lucro, setLucro] = useState(client.lucro);
  const [formaPagamento, setFormaPagamento] = useState(client.formaPagamento);
  const [checklistPagoChecked, setChecklistPagoChecked] = useState(client.checklistPagoChecked);
  const [emailCliente, setEmailCliente] = useState(client.emailCliente);
  const [cpf, setCpf] = useState(client.cpf);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const { fetchClients } = useMain();
  const [checklistReembolsado, setChecklistReembolsado] = useState('Não Solicitado');
  const checklistOptions = ['Não Solicitado', 'Sim', 'Não'];

  // Helper function to convert a BRL currency string to a number
  const parseCurrencyValue = (currencyString) => {
    if (!currencyString) return 0;

    const parsedValue = currencyString
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(/,/g, '.')
      .trim();

    return parseFloat(parsedValue) || 0;
  };

  // Helper function to convert a number to BRL currency format
  const formatCurrencyValue = (value) => {
    const formatoBrasileiro = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatoBrasileiro.format(value);
  };

  // Function to calculate the profit based on the given "Valor da Compra" and "Valor da Venda"
  const calculateProfit = (valorCompra, valorVenda) => {
    const valorCompraNumber = parseCurrencyValue(valorCompra);
    const valorVendaNumber = parseCurrencyValue(valorVenda);

    if (isNaN(valorCompraNumber) || isNaN(valorVendaNumber)) {
      return 0;
    }

    return (valorVendaNumber - valorCompraNumber).toFixed(2);
  };

  useEffect(() => {
    const requiredFields = [
      dataVoo,
      dataVenda,
      companhiaAerea,
      localizador,
      nomePassageiro,
      nomeComprador,
      nomeVendedor,
      contatoVendedor,
      valorCompra,
      valorVenda,
      lucro,
      formaPagamento,
      checklistPagoChecked,
      emailCliente,
      cpf,
    ];
    setIsFormCompleted(requiredFields.some((field) => field.trim() !== ''));
  }, [
    dataVoo,
    dataVenda,
    companhiaAerea,
    localizador,
    nomePassageiro,
    nomeComprador,
    nomeVendedor,
    contatoVendedor,
    valorCompra,
    valorVenda,
    lucro,
    formaPagamento,
    checklistPagoChecked,
    emailCliente,
    cpf,
  ]);

  useEffect(() => {
    if (valorCompra && valorVenda) {
      const valorLucro = calculateProfit(valorCompra, valorVenda);
      const formattedLucro = formatCurrencyValue(valorLucro); // Format the currency value
      setLucro(formattedLucro);
    } else {
      setLucro('');
    }
  }, [valorCompra, valorVenda]);

  const handleSubmit = async () => {
    try {
      const updatedClientData = {
        dataVoo,
        dataVenda,
        companhiaAerea,
        localizador,
        nomePassageiro,
        nomeComprador,
        nomeVendedor,
        contatoVendedor,
        valorCompra,
        valorVenda,
        lucro,
        formaPagamento,
        checklistPagoChecked: checklistPagoChecked ? 'sim' : 'Não' ,
        emailCliente,
        cpf,
      };

      // Define the collection reference
      const clientesCollectionRef = collection(FIRESTORE_DB, 'clientes');
      const documentRef = doc(clientesCollectionRef, client.id);

      // Use the updateDoc() method to update the existing document with the updatedClientData
      await updateDoc(documentRef, updatedClientData);
      await fetchClients();
      alert('Data updated successfully!');
      closeModal(); // Close the modal after successful update
    } catch (error) {
      alert('Failed to update data. Please try again later.');
      console.error('Error updating client:', error);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={closeModal}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <TouchableOpacity onPress={() => closeModal()}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.clientRegisterView}>
            <Text style={styles.label}>Data do Voo:</Text>
            <TextInputMask
              style={styles.input}
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              value={dataVoo}
              onChangeText={setDataVoo}
              placeholder="Digite a data do Voo"
            />

            <Text style={styles.label}>Data da Venda:</Text>
            <TextInputMask
              style={styles.input}
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              value={dataVenda}
              onChangeText={setDataVenda}
              placeholder="Digite a data da venda"
            />

            <Text style={styles.label}>Companhia Aérea:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCompanhiaAerea}
              value={companhiaAerea}
              placeholder="Digite a companhia aérea"
            />

            <Text style={styles.label}>Localizador:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setLocalizador}
              value={localizador}
              placeholder="Digite o localizador"
            />

            <Text style={styles.label}>Nome do Passageiro:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNomePassageiro}
              value={nomePassageiro}
              placeholder="Digite o nome do passageiro"
            />

            <Text style={styles.label}>Nome do Comprador:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNomeComprador}
              value={nomeComprador}
              placeholder="Digite o nome do comprador"
            />

            <Text style={styles.label}>Nome do Vendedor:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNomeVendedor}
              value={nomeVendedor}
              placeholder="Digite o nome do vendedor"
            />

            <Text style={styles.label}>Contato do Vendedor:</Text>
            {/* Use the TextInputMask component for the contatoVendedor input */}
            <TextInputMask
              style={styles.input}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              value={contatoVendedor}
              onChangeText={setContatoVendedor}
              placeholder="Digite o contato do vendedor"
            />

            <Text style={styles.label}>Valor da Compra:</Text>
            {/* Use the TextInputMask component for the valorCompra input */}
            <TextInputMask
              style={styles.input}
              type={'money'}
              value={valorCompra}
              onChangeText={setValorCompra}
              placeholder="Digite o valor da compra"
            />

            <Text style={styles.label}>Valor da Venda:</Text>
            {/* Use the TextInputMask component for the valorVenda input */}
            <TextInputMask
              style={styles.input}
              type={'money'}
              value={valorVenda}
              onChangeText={setValorVenda}
              placeholder="Digite o valor da venda"
            />

            <Text style={styles.label}>Lucro:</Text>
            {/* Use the TextInputMask component for the lucro input */}
            <TextInput
              style={StyleSheet.compose(styles.input, styles.disabled)}
              value={lucro}
              onChangeText={setLucro}
              placeholder="Preencha o valor da venda e da compra"
              editable={false}
            />

            <Text style={styles.label}>Forma de Pagamento:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFormaPagamento}
              value={formaPagamento}
              placeholder="Digite a forma de pagamento"
            />

            <Text style={styles.label}>Checklist Pago:</Text>
            {/* Use the CheckBox component */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={checklistPagoChecked}
                onValueChange={setChecklistPagoChecked}
              />
              <Text style={styles.checkboxLabel}>Sim</Text>
            </View>

            <Text style={styles.label}>Reembolsado:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={checklistReembolsado}
                onValueChange={setChecklistReembolsado}
                style={styles.picker}
              >
                {checklistOptions.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>E-mail do Cliente:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmailCliente}
              value={emailCliente}
              placeholder="Digite o e-mail do cliente"
            />

            <Text style={styles.label}>CPF:</Text>
            <TextInputMask
              style={styles.input}
              type={'cpf'}
              value={cpf}
              onChangeText={setCpf}
              placeholder="Digite o CPF"
            />

            <Button title="Salvar" onPress={handleSubmit} disabled={!isFormCompleted || !nomeComprador} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default ClientDetailsEdit;

const styles = {
  clientRegisterView: {
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
  disabled: {
    backgroundColor: 'rgba(200,200,200,0.2)',
    color: 'rgba(0,0,0,0.6)',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    paddingHorizontal: 10,
  },
};
