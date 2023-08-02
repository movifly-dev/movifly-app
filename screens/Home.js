import { SafeAreaView, ScrollView, Text, View } from 'react-native';

function HomeView() {
  // ================================================================

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.homeView}></View>
        {/* <Text>fffff</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeView;

const styles = {
  homeView: {
    flex: 1,
    padding: 20,
  },
};
