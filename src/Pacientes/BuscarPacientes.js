import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements'

export default function (props) {

    const [paciente, setPaciente] = useState([])
    const cpf = props.route.params

    useEffect(() => {
        fetch('http://192.168.0.10:5000/paciente/' + cpf, {
            method: 'GET'
        })
            .then((response) => {
                if (response.status == 404) {
                    Alert.alert("Nao existe um paciente com o CPF informado!")
                    props.navigation.goBack()
                }
                else {
                    if (!response.ok) {
                        Alert.alert("Mensagem: " + response.status)
                    }
                }
                return response.json()
            })
            .then((json) => {
                setPaciente(json)
            }
            )
            .catch((error) => {
                console.error(error)
            })
    }, []);

    function planoSaude(value) {
        if (value === true) {
            return 'Sim'
        }
        else {
            return 'Nao'
        }
    }

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                    CPF:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + paciente.cpf}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                    Nome:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + paciente.nomePaciente}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                    Telefone:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + paciente.telefone}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                    Data de Nascimento:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + paciente.dataNascimento}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                    Plano de Saúde:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {planoSaude(paciente.planoSaude)}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Atualizar" type="solid" onPress={() => props.navigation.navigate("Cadastro", paciente)} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Excluir" type="solid" />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Cancelar" type="solid" onPress={() => props.navigation.goBack()} />
                </View>
            </View>
        </View>
    );
}


