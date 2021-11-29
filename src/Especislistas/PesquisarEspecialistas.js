import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { Button } from 'react-native-elements'


export default function (props) {
    const [crm, setCrm] = useState("")
    return (
        <View style={style.principal}>
            <View style={style.principal}>
                <Text style={style.texto}>Escolha uma opção:</Text>
                <TextInput
                    onChangeText={crm => setCrm(crm)}
                    placeholder="Informe o CRM do especialista"
                    value={crm.toString()}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title="Buscar" type="solid" onPress={() => {
                            if (crm === "") {
                                Alert.alert("Informe CRM do especialista!")
                            }
                            else {
                                props.navigation.navigate("Busca", crm)
                            }
                        }} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title="Cadastrar" type="solid" onPress={() => props.navigation.navigate("Cadastro")} />
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