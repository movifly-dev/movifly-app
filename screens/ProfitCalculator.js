import { SafeAreaView, ScrollView, Text, View } from "react-native";

function ProfitCalculatorView() {
  // ================================================================

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profitCalculatorView}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfitCalculatorView;

const styles = {
  profitCalculatorView: {
    flex: 1,
    padding: 20,
  },
};
