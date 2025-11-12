import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {

  const [data, setData] = useState(null);
  console.log('[🧪]  Index  data', data)

  useEffect(() => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/articles`;
    console.log('[🧪]  useEffect  url', url)
    
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.error(error));
  }, []);
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-500 font-bold">Edit app/index.tsx to edit this screen.</Text>
      <Text className="text-dark">{process.env.EXPO_PUBLIC_API_URL}</Text>
      {data && <Text className="text-dark">{JSON.stringify(data)}</Text>}
    </View>
  );
}
