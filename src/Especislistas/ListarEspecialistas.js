import React,{useState, useEffect} from 'react';
import {FlatList, Alert} from 'react-native';
import {ListItem} from 'react-native-elements'
import {useIsFocused} from '@react-navigation/native'

export default function Exemplo(props){
    const [data, setData] = useState([])
    const isFocused = useIsFocused();

    function exigePlano(value){
        if(value === 'true'){
            return 'Sim'
        }
        else{
            return 'Não'
        }
    }
   
    function getUserItem({item}) {
        return (         
            <ListItem 
                key={item.id.toString()} 
                bottomDivider 
                onPress={() => props.navigation.navigate("Cadastro", item)}
                >
                 <ListItem.Content>
                    <ListItem.Title>{item.nomeEspecialista}</ListItem.Title> 
                    <ListItem.Subtitle>Id: {""+item.id}</ListItem.Subtitle>     
                    <ListItem.Subtitle>Crm: {""+item.crm}</ListItem.Subtitle>
                    <ListItem.Subtitle>Especialização: {item.especialidade}</ListItem.Subtitle> 
                    <ListItem.Subtitle>Telefone: {item.telefone}</ListItem.Subtitle>
                    <ListItem.Subtitle>Email: {item.email}</ListItem.Subtitle>
                    <ListItem.Subtitle>ExigePlano: {exigePlano(item.exigePlano)}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem> 
        )}
    function fetchData(){
        fetch('http://192.168.0.10:5000/especialista/')
        .then((response) =>{
            if(!response.ok){
                Alert.alert("Ocorreu um erro " + response.status)
            }
            return response.json()
        })
        .then((json) => setData(json))
        .catch((error) => console.error(error))
    }

    useEffect(() => { 
        fetchData();
        props.navigation.addListener('focus', () => {fetchData();});
    }, []);

    return(
        <FlatList
            keyExtractor={({id}) => id.toString()}
            data={data}
            renderItem={getUserItem}
        />
    );
}




