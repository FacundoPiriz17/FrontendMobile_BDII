import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function NativeWindSmokeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-950 px-6">
      <StatusBar style="light" />

      <View className="w-full max-w-sm rounded-2xl border border-cyan-300/40 bg-white p-6 shadow-lg shadow-cyan-500/30">
        <Text className="text-center text-3xl font-black text-slate-950">
          NativeWind OK
        </Text>
        <Text className="mt-3 text-center text-base font-medium text-slate-600">
          Si ves fondo oscuro, tarjeta blanca, borde cyan y texto grande,
          className esta funcionando.
        </Text>
      </View>
    </View>
  );
}
