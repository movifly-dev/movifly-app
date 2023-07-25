import { SafeAreaView, ScrollView, Text, View } from "react-native";

function TicketRegisterView() {
  // ================================================================

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ticketRegisterView}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TicketRegisterView;

const styles = {
  ticketRegisterView: {
    flex: 1,
    padding: 20,
  },
};
