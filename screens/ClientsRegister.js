/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { FIRESTORE_DB } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useMain } from '../contexts/MainContext';
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from '@react-native-picker/picker';

function ClientRegisterView() {
  const [dataVenda, setDataVenda] = useState('');
  const [companhiaAerea, setCompanhiaAerea] = useState('');
  const [localizador, setLocalizador] = useState('');
  const [nomePassageiro, setNomePassageiro] = useState('');
  const [nomeComprador, setNomeComprador] = useState('');
  const [nomeVendedor, setNomeVendedor] = useState('');
  const [contatoVendedor, setContatoVendedor] = useState('');
  const [valorCompra, setValorCompra] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [lucro, setLucro] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [cpf, setCpf] = useState('');
  const [checklistPagoChecked, setChecklistPagoChecked] = useState(false);
  const [checklistReembolsado, setChecklistReembolsado] = useState('Não Solicitado');
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const { fetchClients } = useMain();
  const checklistOptions = ['Não Solicitado', 'Sim', 'Não'];

  useEffect(() => {
    const requiredFields = [
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
      emailCliente,
      cpf,
    ];
    const isFormCompleted = requiredFields.some((field) => field.trim() !== '') || checklistPagoChecked;
    const newClientData = {
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
      checklistReembolsado,
      emailCliente,
      cpf,
    };
    console.log('newClientData', newClientData);
    setIsFormCompleted(isFormCompleted);
  }, [
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

  const handleSubmit = async () => {
    try {
      const newClientData = {
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
        checklistReembolsado,
        emailCliente,
        cpf,
      };
      // Define the collection reference
      const clientesCollectionRef = collection(FIRESTORE_DB, 'clientes');

      // Use the add() method to add a new document with the newClientData to the "clientes" collection
      await addDoc(clientesCollectionRef, newClientData);

      alert('Data submitted successfully!');
      fetchClients();
      setDataVenda('');
      setCompanhiaAerea('');
      setLocalizador('');
      setNomePassageiro('');
      setNomeComprador('');
      setNomeVendedor('');
      setContatoVendedor('');
      setValorCompra('');
      setValorVenda('');
      setLucro('');
      setFormaPagamento('');
      setChecklistPagoChecked(false);
      setChecklistReembolsado('nao_solicitado');
      setEmailCliente('');
      setCpf('');
    } catch (error) {
      alert(error.message);
      throw new Error('Failed to submit data. Please try again later.');
    }
  };

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
    return `R$ ${value.replace('.', ',')}`;
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

  // Calculate profit whenever "Valor da Compra" or "Valor da Venda" changes
  useEffect(() => {
    if (valorCompra && valorVenda) {
      const valorLucro = calculateProfit(valorCompra, valorVenda);
      const formattedLucro = formatCurrencyValue(valorLucro); // Format the currency value
      setLucro(formattedLucro);
    } else {
      setLucro('');
    }
  }, [valorCompra, valorVenda]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.clientRegisterViewStyle}>
          <Text style={styles.label}>Data da Venda:</Text>
          {/* Use the TextInputMask component for the dataVenda input */}
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
          <TextInputMask
            style={styles.input}
            type={'money'}
            value={valorCompra}
            onChangeText={setValorCompra}
            placeholder="Digite o valor da compra"
          />

          <Text style={styles.label}>Valor da Venda:</Text>
          <TextInputMask
            style={styles.input}
            type={'money'}
            value={valorVenda}
            onChangeText={setValorVenda}
            placeholder="Digite o valor da venda"
          />

          <Text style={styles.label}>Lucro:</Text>
          <TextInputMask
            style={StyleSheet.compose(styles.input, styles.disabled)}
            value={lucro}
            type={'money'}
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
              onValueChange={(newValue) => setChecklistPagoChecked(newValue)}
            />
            <Text style={styles.checkboxLabel}>Sim</Text>
          </View>

          <Text style={styles.label}>Reembolsado:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={checklistReembolsado}
              onValueChange={(itemValue) => setChecklistReembolsado(itemValue)}
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
          {/* Use the TextInputMask component for the cpf input */}
          <TextInputMask
            style={styles.input}
            type={'cpf'}
            value={cpf}
            onChangeText={setCpf}
            placeholder="Digite o CPF"
          />

          <Button title="Cadastrar" onPress={handleSubmit} disabled={!isFormCompleted} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ClientRegisterView;

const styles = {
  clientRegisterViewStyle: {
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
    backgroundColor: '#f2f2f2',
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
