import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Inicio from './TelaInicial';
import Especialista from './Especislistas/NavegacaoEspecialistas';
import Paciente from './Pacientes/NavegacaoPacientes';
import Consultas from './Consultas/NavegacaoConsultas';


const Drawer = createDrawerNavigator();


export default function(){
    return(
      <NavigationContainer>
    <Drawer.Navigator>
    <Drawer.Screen name="Início" component={Inicio} />
      <Drawer.Screen name="Especialistas" component={Especialista} />
      <Drawer.Screen name="Pacientes" component={Paciente} />
      <Drawer.Screen name="Consultas" component={Consultas} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}