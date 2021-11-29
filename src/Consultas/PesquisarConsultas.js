import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { Button } from 'react-native-elements'


export default function (props) {
    const [codigo, setCodigo] = useState("")
    return (
        <View style={style.principal}>
            <View style={style.principal}>
                <Text style={style.texto}>Selecione uma opção:</Text>
                <TextInput
                    onChangeText={codigo => setCodigo(codigo)}
                    placeholder="Informe o código da consulta!"
                    value={codigo.toString()}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title="Buscar" type="solid" onPress={() => {
                            if (codigo === "") {
                                Alert.alert("Informe o código da consulta!")
                            }
                            else {
                                props.navigation.navigate("Busca", codigo)
                            }
                        }} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title="Agendar" type="solid" onPress={() => props.navigation.navigate("Cadastro")} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    principal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        textAlign: 'center',
        fontSize: 16
    },
    viewBotoes: {
        flex: 1
    }

})