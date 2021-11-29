import React, {useState} from 'react'
import {View, TextInput, StyleSheet, Button, Alert} from 'react-native'

export default function (props){
    const [especialista, setEspecialista] = useState(props.route.params ? props.route.params: {})

    /*if(especialista.id === undefined){
        especialista.crm = ""
        especialista.exigePlano = ""
    }*/
    



    const insert = () => {
        if(especialista.id === undefined){
            especialista.crm = parseInt(especialista.crm)
            if(especialista.exigePlano === 'true'){
                especialista.exigePlano = "SIM"
            }else{
                especialista.exigePlano = "NAO"
            }

            fetch('http://192.168.0.10:5000/especialista/', {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    "crm" : especialista.crm,
                    "nomeEspecialista" : especialista.nomeEspecialista,
                    "especialidade" : especialista.especialidade, 
                    "telefone" : especialista.telefone,
                    "email" : especialista.email,
                    "exigePlano" : especialista.exigePlano
                })
            })
            .then((response) => {   
                if(!response.ok){
                    Alert.alert("Mensagem: " + response.status) 
                }
                else{
                    Alert.alert("especialista inserido com sucesso!")  
                    especialista.crm = ""
                    especialista.nomeEspecialista = ""
                    especialista.especialidade = ""
                    especialista.telefone = ""
                    especialista.email = ""
                    especialista.exigePlano = ""
                    props.navigation.navigate("Lista")
                }
                
            })
            .catch((error) => {
                console.error(error)}
            )
        }
        else{
            fetch('http://192.168.0.10:5000/especialista/'+especialista.id, {
                method: 'PUT',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    "crm" : especialista.crm,
                    "nomeEspecialista" : especialista.nomeEspecialista,
                    "especialidade" : especialista.especialidade, 
                    "telefone" : especialista.telefone,
                    "email" : especialista.email,
                    "exigePlano" : especialista.exigePlano
                })
            })
            .then((response) => {   
                if(!response.ok){
                    Alert.alert("Mensagem: " + response.status) 
                }
                else{
                    Alert.alert("especialista atualizado com sucesso!")  
                    especialista.crm = ""
                    especialista.nomeEspecialista = ""
                    especialista.especialidade = ""
                    especialista.telefone = ""
                    especialista.email = ""
                    especialista.exigePlano = ""                  
                }
                props.navigation.navigate("Lista")
            })
            .catch((error) => {
                console.error(error)}
            )
        }
    }

    const remove = () => {
        console.warn(especialista.id)
        if(especialista.id === undefined){
            Alert.alert("O especialista não está cadastrado!")
        }
        else{
            fetch('http://192.168.0.10:5000/especialista/'+especialista.id, {
                method: 'DELETE',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then((response) => {   
                if(!response.ok){
                    Alert.alert("Mensagem: " + response.status) 
                }
                else{
                    Alert.alert("Especialista removido com sucesso!")  
                    especialista.crm = ""
                    especialista.nomeEspecialista = ""
                    especialista.especialidade = ""
                    especialista.telefone = ""
                    especialista.email = ""
                    especialista.exigePlano = ""
                    props.navigation.navigate("Lista")
                }
                return response.json()
            })
            .catch((error) => {
                console.error(error)}
            )
        }
    }

    return(
        
        <View style={styles.form}>
        <TextInput 
            onChangeText={crm => setEspecialista({...especialista, crm})}
            placeholder="Informe o CRM"
            value={""+especialista.crm}
            style={styles.input}
        /> 

       
        <TextInput 
            onChangeText={nomeEspecialista => setEspecialista({...especialista, nomeEspecialista})}
            placeholder="Informe o nome do especialista"
            value={especialista.nomeEspecialista}
            style={styles.input}
        />

        <TextInput 
            onChangeText={especialidade => setEspecialista({...especialista, especialidade})}
            placeholder="Informe a especialização"
            value={especialista.especialidade}
            style={styles.input}
        />
        
         <TextInput 
            onChangeText={telefone => setEspecialista({...especialista, telefone})}
            placeholder="Informe o telefone"
            value={especialista.telefone}
            style={styles.input}
        />

        <TextInput 
            onChangeText={email => setEspecialista({...especialista, email})}
            placeholder="Informe o email"
            value={especialista.email}
            style={styles.input}
        />  

        
        <TextInput 
            onChangeText={(exigePlano) => { setEspecialista({...especialista, exigePlano})}}
            placeholder="Exige Plano ? true ou false"
            value={""+especialista.exigePlano}
            style={styles.input}
        /> 

        <View style={styles.buttons}>
            <Button title="Salvar" onPress={(insert)}/>
            <Button title="Excluir" onPress={(remove)}/>
            <Button title="Cancelar" onPress={() => props.navigation.goBack()}/>
        </View>
        
    </View>
     )
}    

const styles = StyleSheet.create({
    form:{
        padding:12
    },
    input:{
        height:40,
        borderColor:'gray',
        borderWidth:1,
        marginBottom:10
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-around'
    }
})