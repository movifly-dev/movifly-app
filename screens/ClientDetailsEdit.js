/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '../firebaseConfig';
import { updateDoc, collection, doc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import { useMain } from '../contexts/MainContext';


function ClientDetailsEdit({ isVisible, client, closeModal }) {
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
  const [checklistPago, setChecklistPago] = useState(client.checklistPago);
  const [emailCliente, setEmailCliente] = useState(client.emailCliente);
  const [cpf, setCpf] = useState(client.cpf);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const { fetchClients } = useMain();

  console.log('MAMAFDP:', {
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
  });
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

    if (valorCompra && valorVenda) {
      setLucro(`${Number(valorVenda) - Number(valorCompra)}`);
    } else {
      setLucro('00,00');
    }
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
      const updatedClientData = {
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

  // useEffect(() => {

  // }, [valorVenda, valorCompra]);

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
              value={lucro === 'NaN' ? 'Valor da compra ou venda não é número' : lucro}
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
    color: 'rgba(0,0,0,0.6)'
  }
};
