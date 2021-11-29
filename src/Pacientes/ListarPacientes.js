import React, { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'

export default function Exemplo(props) {
    const [data, setData] = useState([])
    const isFocused = useIsFocused();

    function planoSaude(value) {
        if (value === true) {
            return 'Sim'
        }
        else {
            return 'Nao'
        }
    }
    function splitData(data) {
        let aux = data.split('T')
        let aux_data = aux[0].split('-')
        return aux_data[2] + "/" + aux_data[1] + "/" + aux_data[0]
    }
    function getUserItem({ item }) {
        return (
            <ListItem
                key={item.id.toString()}
                bottomDivider
                onPress={() => props.navigation.navigate("Cadastro", item)}
            >
                <ListItem.Content>
                    <ListItem.Title>{item.nomePaciente}</ListItem.Title>
                    <ListItem.Subtitle>Id: {item.id}</ListItem.Subtitle>
                    <ListItem.Subtitle>CPF: {item.cpf}</ListItem.Subtitle>
                    <ListItem.Subtitle>Data de Nascimento: {splitData(item.dataNascimento)}</ListItem.Subtitle>
                    <ListItem.Subtitle>Telefone: {item.telefone}</ListItem.Subtitle>
                    <ListItem.Subtitle>Plano de Saúde: {planoSaude(item.planoSaude)}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }
    function fetchData() {
        fetch('http://192.168.0.10:5000/paciente/')
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
            keyExtractor={({id}) => id.toString()}
            data={data}
            renderItem={getUserItem}
        />
    );
}



