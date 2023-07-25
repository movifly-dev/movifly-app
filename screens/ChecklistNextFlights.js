import { SafeAreaView, ScrollView, Text, View } from "react-native";

function ChecklistNextFlightsView() {
  // ================================================================

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.checklistNextFlightsView}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ChecklistNextFlightsView;

const styles = {
  checklistNextFlightsView: {
    flex: 1,
    padding: 20,
  },
};
