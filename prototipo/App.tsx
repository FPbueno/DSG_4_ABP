import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./navigation/Navigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}