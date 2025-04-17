import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OfferScreen from './Offers';
import Profiles from './Profile';
import Documents from './Documents';
import MatchList from '../components/matchList';
import ChatList from '../components/ChatList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BACKGROUND } from '../utils/constants';
import { Animated,Text } from 'react-native';


const Tab = createBottomTabNavigator();

// Componente animado con escala y opacidad
const AnimatedTabIcon = ({ name, color, focused }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: focused ? 1.4 : 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: focused ? 1 : 0.6,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], opacity: opacityValue }}>
      <Icon name={name} color={color} size={26} />
    </Animated.View>
  );
};

// Función para seleccionar ícono
const getTabIcon = (route, color, focused) => {
  let iconName;

  switch (route.name) {
    case 'Offer':
      iconName = 'briefcase';
      break;
    case 'Matches':
      iconName = 'heart';
      break;
    case 'Profile':
      iconName = 'user';
      break;
    case 'Chats':
      iconName = 'comments';
      break;
    case 'Document':
      iconName = 'folder-o';
      break;
    default:
      iconName = 'circle';
  }

  return <AnimatedTabIcon name={iconName} color={color} focused={focused} />;
};

export default function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Offer" // 👈 Esta línea
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => getTabIcon(route, color, focused),
        tabBarStyle: {
          backgroundColor: BACKGROUND.secondary,
          borderTopColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          height: 50,
          borderTopColor: '#ccc', // o el color que quieras
          borderTopWidth: 1,       // grosor de la línea
          paddingTop: 4
        },
        tabBarActiveTintColor: '#2E6EDB',
        tabBarInactiveTintColor: '#8FA7C3',
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Chats"
        component={ChatList}
        options={{
          tabBarLabel: 'Chat',
          headerBackVisible: false,
          headerTitle: () => (
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#2E6EDB',
              textAlign: 'center',
            }}>
              Mis chats
            </Text>
          ),
          headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#e5f1ff',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            elevation: 4, // sombra en Android
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchList}
        options={{
          tabBarLabel: 'Matchs',
          headerBackVisible: false,
          headerTitle: () => (
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#2E6EDB',
              textAlign: 'center',
            }}>
              Mis Matchs
            </Text>
          ),
          headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#e5f1ff',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            elevation: 4, // sombra en Android
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
        }}
      />
      <Tab.Screen
        name="Offer"
        component={OfferScreen}
        options={{
          tabBarLabel: 'Ofertas',
          headerBackVisible: true,
          headerTitle: () => (
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#2E6EDB',
              textAlign: 'center',
            }}>
              Mis Ofertas
            </Text>
          ),
          headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#e5f1ff',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            elevation: 4, // sombra en Android
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
        }}
      
      />
      <Tab.Screen
        name="Document"
        component={Documents}
        options={{
          tabBarLabel: 'Documentos',
          headerBackVisible: true,
          headerTitle: () => (
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#2E6EDB',
              textAlign: 'center',
            }}>
              Mis Documentos
            </Text>
          ),
          headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#e5f1ff',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            elevation: 4, // sombra en Android
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
        }}
      
      />
      <Tab.Screen
        name="Profile"
        component={Profiles}
        options={{
          tabBarLabel: 'Perfil',
          headerBackVisible: true,
          headerTitle: () => (
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#2E6EDB',
              textAlign: 'center',
            }}>
              Mi Perfil
            </Text>
          ),
          headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#e5f1ff',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            elevation: 4, // sombra en Android
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
        }}
      />
    </Tab.Navigator>
  );
}
