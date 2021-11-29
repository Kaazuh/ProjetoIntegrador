import React, { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'

export default function Exemplo(props) {
    const [data, setData] = useState([])
    const isFocused = useIsFocused();

    function splitData(data) {
        let aux = data.split('T')
        let aux_data = aux[0].split('-')
        return aux_data[2] + "/" + aux_data[1] + "/" + aux_data[0]
    }
    function getUserItem({ item }) {
        return (
            <ListItem
                key={item.codigo.toString()}
                bottomDivider
                onPress={() => props.navigation.navigate("Cadastro", item)}
            >
                <ListItem.Content>
                    <ListItem.Subtitle>{item.codigo}</ListItem.Subtitle>
                    <ListItem.Subtitle>Data: {splitData(item.dataConsulta)}</ListItem.Subtitle>
                    <ListItem.Subtitle>Id do Paciente: {""+item.PacienteId}</ListItem.Subtitle>
                    <ListItem.Subtitle>Id do Especialista: {""+item.EspecialistaId}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }
    function fetchData() {
        fetch('http://192.168.0.10:5000/consulta/')
            .then((response) => {
                if (!response.ok) {
                    Alert.alert("Ocorreu um erro " + response.status)
                }
                return response.json()
            })
            .then((json) => setData(json))
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        fetchData();
        props.navigation.addListener('focus', () => { fetchData(); });
    }, []);

    return (
        <FlatList
            keyExtractor={({ codigo }) => codigo}
            data={data}
            renderItem={getUserItem}
        />
    );
}




