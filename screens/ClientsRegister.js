/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useMain } from '../contexts/MainContext';
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from '@react-native-community/datetimepicker';
import formatDateToString from '../utils/formatDateToString';

function ClientRegisterView() {
  const [dataVooSelected, setDataVooSelected] = useState(false);
  const [dataVendaSelected, setDataVendaSelected] = useState(false);
  const [showDataVooPicker, setShowDataVooPicker] = useState(false);
  const [showDataVendaPicker, setShowDataVendaPicker] = useState(false);
  const [dataVoo, setDataVoo] = useState(new Date());
  const [dataVenda, setDataVenda] = useState(new Date());
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
  const [checklistPagoChecked, setChecklistPagoChecked] = useState('Não');
  // const [checklistReembolsado, setChecklistReembolsado] = useState('Não Solicitado');
  const [isFormCompleted, setIsFormCompleted] = useState(true);
  const { fetchClients } = useMain();
  // const checklistOptions = ['Não Solicitado', 'Sim', 'Não'];

  // useEffect(() => {
  // const requiredFields = [
  //   dataVoo,
  //   dataVenda,
  //   companhiaAerea,
  //   localizador,
  //   nomePassageiro,
  //   nomeComprador,
  //   nomeVendedor,
  //   contatoVendedor,
  //   valorCompra,
  //   valorVenda,
  //   lucro,
  //   formaPagamento,
  //   emailCliente,
  //   cpf,
  // ];
  // const isFormCompleted = requiredFields.some((field) => field.trim() !== '') || checklistPagoChecked;
  // }, []);

  const handleSubmit = async () => {
    try {
      const newClientData = {
        dataVoo: dataVooSelected ? formatDateToString(dataVoo) : '',
        dataVenda: dataVendaSelected ? formatDateToString(dataVenda) : '',
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
        // checklistReembolsado,
        emailCliente,
        cpf,
        createdAt: serverTimestamp(),
      };
      // Define the collection reference
      const clientesCollectionRef = collection(FIRESTORE_DB, 'clientes');

      // Use the add() method to add a new document with the newClientData to the "clientes" collection
      await addDoc(clientesCollectionRef, newClientData);

      Alert.alert('Data submitted successfully!');
      fetchClients();
      setDataVooSelected(false);
      setDataVendaSelected(false);
      setDataVoo(new Date());
      setDataVenda(new Date());
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
      setChecklistPagoChecked('');
      // setChecklistReembolsado('nao_solicitado');
      setEmailCliente('');
      setCpf('');
    } catch (error) {
      Alert.alert(error.message);
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

  const handleDataVooChange = (event, selectedDate) => {
    setShowDataVooPicker(false);
    setDataVooSelected(true);
    if (selectedDate) {
      setDataVoo(selectedDate);
    }
  };

  const handleDataVendaChange = (event, selectedDate) => {
    setShowDataVendaPicker(false);
    setDataVendaSelected(true);
    if (selectedDate) {
      setDataVenda(selectedDate);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.clientRegisterViewStyle}>
          {/* Date of Flight */}
          <View style={{marginBottom: 16}}>
            <Text style={{marginBottom: 8}}>Data do Voo:</Text>
            <Button color="#ef7946" title={dataVooSelected ? formatDateToString(dataVoo) : 'Selecionar Data'} onPress={() => setShowDataVooPicker(true)} />
            {showDataVooPicker && (
              <DateTimePickerModal
                value={dataVoo}
                mode="date"
                display="calendar"
                onChange={handleDataVooChange}
              />
            )}
          </View>

          {/* Date of Sale */}
          <View style={{marginBottom: 20, marginTop: 8}}>
            <Text style={{marginBottom: 8}}>Data da Venda:</Text>
            <Button color="#ef7946" title={dataVendaSelected ? formatDateToString(dataVenda) : 'Selecionar Data'} onPress={() => setShowDataVendaPicker(true)} />
            {showDataVendaPicker && (
              <DateTimePickerModal
                value={dataVenda}
                mode="date"
                display="calendar"
                onChange={handleDataVendaChange}
              />
            )}
          </View>
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
          <TextInput
            style={StyleSheet.compose(styles.input, styles.disabled)}
            value={lucro}
            onChangeText={setLucro}
            placeholder="Preencha o valor da venda e da compra"
            editable={false}
          />

          <Text style={styles.label}>Forma de Pagamento:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formaPagamento}
              onValueChange={(itemValue) => setFormaPagamento(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Boleto" value="Boleto" />
              <Picker.Item label="Pix" value="Pix" />
              <Picker.Item label="Transferência Bancária" value="Transferência Bancária" />
              <Picker.Item label="Cartão de crédito" value="Cartão de crédito" />
            </Picker>
          </View>

          <Text style={styles.label}>Checklist Pago:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={checklistPagoChecked}
              onValueChange={(itemValue) => setChecklistPagoChecked(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Sim" value="Sim" />
              <Picker.Item label="Não" value="Não" />
            </Picker>
          </View>

          {/* <Text style={styles.label}>Reembolsado:</Text>
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
          </View> */}

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

          <Button color="#ef7946" title="Cadastrar" onPress={handleSubmit} disabled={!isFormCompleted} />
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
