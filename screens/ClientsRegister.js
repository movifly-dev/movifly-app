/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

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
  const [checklistPago, setChecklistPago] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [cpf, setCpf] = useState('');
  const [isFormCompleted, setIsFormCompleted] = useState(false);

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
      checklistPago,
      emailCliente,
      cpf,
    ];
    setIsFormCompleted(requiredFields.some((field) => field.trim() !== ''));
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
    checklistPago,
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
        checklistPago,
        emailCliente,
        cpf,
      };
      console.log('newClientData', newClientData);
      // Define the collection reference
      const clientesCollectionRef = collection(FIRESTORE_DB, 'clientes');

      // Use the add() method to add a new document with the newClientData to the "clientes" collection
      await addDoc(clientesCollectionRef, newClientData);

      alert('Data submitted successfully!');
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
      setChecklistPago('');
      setEmailCliente('');
      setCpf('');
    } catch (error) {
      alert(error.message);
      throw new Error('Failed to submit data. Please try again later.');
    }
  };

  // useEffect(() => {

  // }, [valorVenda, valorCompra]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.clientRegisterView}>
          <Text style={styles.label}>Data da Venda:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDataVenda}
            value={dataVenda}
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
          <TextInput
            style={styles.input}
            onChangeText={setContatoVendedor}
            value={contatoVendedor}
            placeholder="Digite o contato do vendedor"
          />

          <Text style={styles.label}>Valor da Compra:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setValorCompra}
            value={valorCompra}
            placeholder="Digite o valor da compra"
          />

          <Text style={styles.label}>Valor da Venda:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setValorVenda}
            value={valorVenda}
            placeholder="Digite o valor da venda"
          />

          <Text style={styles.label}>Lucro:</Text>
          <TextInput
            style={StyleSheet.compose(styles.input, styles.disabled)}
            value={lucro}
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
          <TextInput
            style={styles.input}
            onChangeText={setChecklistPago}
            value={checklistPago}
            placeholder="Digite se o checklist foi pago"
          />

          <Text style={styles.label}>E-mail do Cliente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmailCliente}
            value={emailCliente}
            placeholder="Digite o e-mail do cliente"
          />

          <Text style={styles.label}>CPF:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCpf}
            value={cpf}
            placeholder="Digite o CPF"
          />

          <Button title="Cadastrar" onPress={handleSubmit} disabled={!isFormCompleted || !nomeComprador} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ClientRegisterView;

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
    backgroundColor: '#f2f2f2',
  }
};
