import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Listagem from '../Especislistas/ListarEspecialistas'
import Busca from '../Especislistas/BuscarEspecialistas'
import Cadastro from '../Especislistas/CadastrarEspecialistas'
import BuscaCadastro from '../Especislistas/PesquisarEspecialistas'
import { Button, Icon } from 'react-native-elements'

const Stack = createStackNavigator()

export default function (props) {
    return (

        <Stack.Navigator initialRouteName="Lista" screenOptions={screenOptions}>
            <Stack.Screen name="Lista" component={Listagem} options={({ navigation }) => {
                return {
                    title: "Especialistas Cadastrados",
                    headerRight: () => (
                        <Button
                            type="clear"
                            icon={<Icon name="add" size={25} color='white' />}
                            onPress={() => navigation.navigate('BuscaCadastro')}
                        />
                    ),
                }
            }} />
            <Stack.Screen name="Busca" component={Busca} options={{ title: "Resultado da busca" }} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: "Inserir/Atualizar um especialista" }} />
            <Stack.Screen name="BuscaCadastro" component={BuscaCadastro} options={{ title: "Inserir/Pesquisar um especialista" }} />
        </Stack.Navigator>

    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#4682B4'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
}
