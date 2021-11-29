import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native'

export default function (props){
    const [paciente, setPaciente] = useState(props.route.params ? props.route.params: {})

    
    const insert = () => {
        if(paciente.id === undefined){
            fetch('http://192.168.0.10:5000/paciente/', {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    "nomePaciente" : paciente.nomePaciente,
                    "cpf": paciente.cpf,
                    "telefone": paciente.telefone, 
                    "dataNascimento": paciente.dataNascimento,
                    "planoSaude": paciente.planoSaude
                })
            })
            .then((response) => {   
                if(!response.ok){
                    Alert.alert("Mensagem: " + response.status) 
                }
                else{
                    Alert.alert("paciente inserido com sucesso!")  
                    paciente.nomePaciente = ""
                    paciente.cpf = ""
                    paciente.telefone = ""
                    paciente.dataNascimento = ""
                    paciente.planoSaude = ""
                    props.navigation.navigate("Lista")
                }
                
                
            })
            .catch((error) => {
                console.error(error)}
            )
        }
        else{
            fetch('http://192.168.0.10:5000/paciente/'+paciente.id, {
                method: 'PUT',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    "nomePaciente" : paciente.nomePaciente,
                    "cpf": paciente.cpf,
                    "telefone": paciente.telefone, 
                    "dataNascimento": paciente.dataNascimento,
                    "planoSaude": paciente.planoSaude
                })
            })
            .then((response) => {   
                if(!response.ok){
                    Alert.alert("Mensagem: " + response.status) 
                }
                else{
                    Alert.alert("paciente atualizado com sucesso!")  
                    paciente.nomePaciente = ""
                    paciente.cpf = ""
                    paciente.telefone = ""
                    paciente.dataNascimento = ""
                    paciente.planoSaude = ""                    
                }
                props.navigation.navigate("Lista")
            })
            .catch((error) => {
                console.error(error)}
            )
        }
    }

    const remove = () => {
        console.warn(paciente.id)
        if(paciente.id === undefined){
            Alert.alert("O paciente nao esta cadastrado!")
        }
        else{
            fetch('http://192.168.0.10:5000/paciente/'+paciente.id, {
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
                    Alert.alert("paciente removido com sucesso!")  
                    paciente.nomePaciente = ""
                    paciente.cpf = ""
                    paciente.telefone = ""
                    paciente.dataNascimento = ""
                    paciente.planoSaude = ""
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
        <Text>Nome:</Text>
        <TextInput 
            onChangeText={nomePaciente => setPaciente({...paciente, nomePaciente})}
            placeholder="Informe o nome do paciente"
            value={paciente.nomePaciente}
            style={styles.input}
        />
        <Text>Cpf:</Text>
        <TextInput 
            onChangeText={cpf => setPaciente({...paciente, cpf})}
            placeholder="Informe o cpf do paciente"
            value={paciente.cpf}
            style={styles.input}
        />
        <Text>Telefone:</Text>
        <TextInput 
            onChangeText={telefone => setPaciente({...paciente, telefone})}
            placeholder="Informe o telefone do paciente"
            value={paciente.telefone}
            style={styles.input}
        />
        <Text>dataNascimento:</Text>
        <TextInput 
            onChangeText={dataNascimento => setPaciente({...paciente, dataNascimento})}
            placeholder="Informe a data de nascimento do paciente"
            value={paciente.dataNascimento}
            style={styles.input}
        />
        <Text>Status:</Text>
        <TextInput 
            onChangeText={(planoSaude) => {
                setPaciente({...paciente, planoSaude})}}
            placeholder="O paciente tem plano de saude?"
            value={""+paciente.planoSaude}
            style={styles.input}
        />
        <View style={styles.buttons}>
            <Button title="Salvar" onPress={(insert)}/>
            <Button title="Remover" onPress={(remove)}/>
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