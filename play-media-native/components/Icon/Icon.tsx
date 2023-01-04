import Ionicons from "@expo/vector-icons/Ionicons";

export const Icon = ({ name, size, color }) => {
  return <Ionicons name={name} size={size || 32} color={color || "black"} />;
};
