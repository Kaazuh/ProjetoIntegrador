import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements'

export default function (props) {

    const [consulta, setConsulta] = useState([])
    const codigo = props.route.params

    useEffect(() => {
        fetch('http://192.168.0.10:5000/consulta/' + codigo, {
            method: 'GET'
        })
            .then((response) => {
                if (response.status == 404) {
                    Alert.alert("Nao existe consulta para o Código informado!")
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
                setConsulta(json)
            }
            )
            .catch((error) => {
                console.error(error)
            })
    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                    Data:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + consulta.dataConsulta}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                    Paciente Id:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + consulta.PacienteId}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                    Especialista Id:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + consulta.EspecialistaId}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Atualizar" type="solid" onPress={() => props.navigation.navigate("Cadastro", consulta)} />
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


