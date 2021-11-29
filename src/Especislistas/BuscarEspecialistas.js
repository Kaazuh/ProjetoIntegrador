import React,{useState, useEffect} from 'react';
import {View,Text, Alert} from 'react-native';
import {Button} from 'react-native-elements'

export default function (props){

const [especialista, setEspecialista] = useState([])
const crm = props.route.params

useEffect(() => {
    fetch('http://192.168.0.10:5000/especialista/' + crm, {
        method: 'GET'
    })
    .then((response) => {    
        if(response.status == 404){
            Alert.alert("Não existe um especialista com o CRM informado!")
            props.navigation.goBack()
        }
        else{
            if(!response.ok){
                Alert.alert("Mensagem: " + response.status)
            }
        }
        return response.json()
    })
    .then((json) => {
            setEspecialista(json)
        }
    )
    .catch((error) => {
        console.error(error)})
    }, []);

    function exigePlano(value){
        if(value === true){
            return 'Sim'
        }
        else{
            return 'Nao'
        }
    }

return(
    <View style={{flex:1, padding: 24}}>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Crm:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" + especialista.crm}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Nome:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" + especialista.nomeEspecialista}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Especialidade:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +especialista.especialidade}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Telefone:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +especialista.telefone}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                E-mail:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +especialista.email}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Exige Plano:  
            </Text>
            <Text style={{fontSize:18}}>
                {exigePlano("/t" +especialista.exigePlano)}
            </Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', padding: 20}}>
            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <Button title="Salvar" type="solid" onPress={() => props.navigation.navigate("Cadastro", especialista)}/>
            </View>
            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <Button title="Excluir" type="solid"/>
            </View>
            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <Button title="Cancelar" type="solid" onPress={() => props.navigation.goBack()}/>
            </View>
        </View>
    </View>
);
}


