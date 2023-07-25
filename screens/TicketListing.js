import { SafeAreaView, ScrollView, Text, View } from "react-native";

function TicketListingView() {
  // ================================================================

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ticketListingView}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TicketListingView;

const styles = {
  ticketListingView: {
    flex: 1,
    padding: 20,
  },
};
