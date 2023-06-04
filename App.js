import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';


const BuscaCEPApp = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');

  const buscarCEP = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (response.ok && !data.erro) {
        setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`);
      } else {
        setEndereco('');
        Alert.alert('Erro', 'CEP não encontrado');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#87CEEB' }}>
      <Text>Informe o CEP desejado:</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, margin: 10, }}
        onChangeText={text => setCep(text)}
        value={cep}
        keyboardType="numeric"
      />
      <Button title="Buscar" onPress={buscarCEP} />
      <Text style={{ marginTop: 20 }}>{endereco}</Text>
    </View>
  );
};

export default BuscaCEPApp;
