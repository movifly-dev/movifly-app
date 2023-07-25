import { SafeAreaView, ScrollView, Text, View } from "react-native";

function ClientRegisterView() {
  // ================================================================

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.clientRegisterView}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ClientRegisterView;

const styles = {
  clientRegisterView: {
    flex: 1,
    padding: 20,
  },
};
