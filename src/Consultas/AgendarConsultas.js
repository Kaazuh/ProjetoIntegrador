import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native'

export default function (props) {
    const [consulta, setConsulta] = useState(props.route.params ? props.route.params : {})

    const insert = () => {
        if (consulta.codigo === undefined) {
            fetch('http://192.168.0.10:5000/consultas/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "dataConsulta": consulta.dataConsulta,
                    "PacienteId": consulta.PacienteId,
                    "EspecialistaId": consulta.EspecialistaId
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        Alert.alert("Mensagem: " + response.status)
                    }
                    else {
                        Alert.alert("Consulta agendada com sucesso!")
                        consulta.dataConsulta = ""
                        consulta.PacienteId = ""
                        consulta.EspecialistaId = ""
                        props.navigation.navigate("Lista")
                    }

                })
                .catch((error) => {
                    console.error(error)
                }
                )
        }
        else {
            fetch('http://192.168.0.10:5000/consultas/' + consulta.codigo, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "codigo": consulta.codigo,
                    "dataConsulta": consulta.dataConsulta,
                    "PacienteId": consulta.PacienteId,
                    "EspecialistaId": consulta.EspecialistaId
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        Alert.alert("Mensagem: " + response.status)
                    }
                    else {
                        Alert.alert("Consulta atualizada com sucesso!")
                        consulta.dataConsulta = ""
                        consulta.PacienteId = ""
                        consulta.EspecialistaId = ""
                    }
                    props.navigation.navigate("Lista")
                })
                .catch((error) => {
                    console.error(error)
                }
                )
        }
    }

    const remove = () => {
        console.warn(consulta.codigo)
        if (consulta.codigo === undefined) {
            Alert.alert("Consulta não agendada!")
        }
        else {
            fetch('http://192.168.0.10:5000/consultas/' + consulta.codigo, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then((response) => {
                    if (!response.ok) {
                        Alert.alert("Mensagem: " + response.status)
                    }
                    else {
                        Alert.alert("Consulta desmarcada com sucesso!")
                        consulta.dataConsulta = ""
                        consulta.PacienteId = ""
                        consulta.EspecialistaId = ""
                        props.navigation.navigate("Lista")
                    }
                    return response.json()
                })
                .catch((error) => {
                    console.error(error)
                }
                )
        }
    }

    return (
        <View style={styles.form}>

            <TextInput
                onChangeText={dataConsulta => setConsulta({ ...consulta, dataConsulta })}
                placeholder="Informe uma dataConsulta"
                value={consulta.dataConsulta}
                style={styles.input}
            />

            <TextInput
                onChangeText={(PacienteId) => {
                    setConsulta({ ...consulta, PacienteId })
                }}
                placeholder="Informe o id do paciente desejado"
                value={consulta.PacienteId}
                style={styles.input}
            /> 

            <TextInput
                onChangeText={EspecialistaId => setConsulta({ ...consulta, EspecialistaId })}
                placeholder="Informe o id do especialista desejado"
                value={consulta.EspecialistaId}
                style={styles.input}
            />

            <View style={styles.buttons}>
                <Button title="Salvar" onPress={(insert)} />
                <Button title="Excluir" onPress={(remove)} />
                <Button title="Cancelar" onPress={() => props.navigation.goBack()} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})