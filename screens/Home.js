import React from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Home page component
function HomeView() {
  const navigation = useNavigation();

  // Function to navigate to a specific screen
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.homeView}>
          {/* Box 0 - Voos Search */}
          <TouchableOpacity style={styles.box} onPress={() => navigateToScreen('OffersSearch')}>
            <FontAwesome5 name="search-location" size={35} color="white" />
            <Text style={styles.boxText}>Buscar Voos</Text>
          </TouchableOpacity>

          {/* Box 1 - Sales */}
          <TouchableOpacity style={styles.box} onPress={() => navigateToScreen('ClientsRegisterDrawerItem')}>
            <Ionicons name="cash-outline" size={40} color="white" />
            <Text style={styles.boxText}>Vendas</Text>
          </TouchableOpacity>

          {/* Box 2 - Tickets */}
          <TouchableOpacity style={styles.box} onPress={() => navigateToScreen('TicketsRegisterDrawerItem')}>
            <FontAwesome5 name="ticket-alt" size={30} color="white" />
            <Text style={styles.boxText}>Consulta De Bilhetes</Text>
          </TouchableOpacity>

          {/* Box 3 - Refunds */}
          <TouchableOpacity style={styles.box} onPress={() => navigateToScreen('RefundRegisterDrawerItem')}>
            <MaterialCommunityIcons name="cash-refund" size={40} color="white" />
            <Text style={styles.boxText}>Reembolsos</Text>
          </TouchableOpacity>

          {/* Box 4 - Pending Quotes */}
          <TouchableOpacity style={styles.box} onPress={() => navigateToScreen('PendingQuotesRegisterDrawerItem')}>
            <MaterialIcons name="request-quote" size={40} color="white" />
            <Text style={styles.boxText}>Cotações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => navigateToScreen('NextFlightsView')}>
            <MaterialIcons name="flight" size={40} color="white" />
            <Text style={styles.boxText}>Voos Próximos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={() => navigateToScreen('InfoExportation')}>
            <FontAwesome5 name="download" size={35} color="white" />
            <Text style={styles.boxText}>Exportar Informações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = {
  homeView: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  box: {
    width: '45%', // Adjust width as needed
    height: 150, // Adjust height as needed
    backgroundColor: '#ef7946',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  boxText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
};

export default HomeView;
