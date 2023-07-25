import { SafeAreaView, ScrollView, Text, View } from "react-native";

function ClientsListingView() {
  // ================================================================

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.clientsListingView}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ClientsListingView;

const styles = {
  clientsListingView: {
    flex: 1,
    padding: 20,
  },
};
