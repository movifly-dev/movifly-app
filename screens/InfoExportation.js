import { SafeAreaView, ScrollView, Text, View } from "react-native";

function InfoExportationView() {
  // ================================================================

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoExportationView}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default InfoExportationView;

const styles = {
  infoExportationView: {
    flex: 1,
    padding: 20,
  },
};
