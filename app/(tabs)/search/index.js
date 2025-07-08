import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchbut from "../../../components/Searchbut";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useRouter } from "expo-router";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setResult([]);
      return;
    }

    const q = query(
      collection(db, "users"),
      where("username", ">=", searchQuery),
      where("username", "<=", searchQuery + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    setResult(users);
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch();
    }, 300); // debounce delay

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  return (
    <SafeAreaView className="pl-3 pr-3">
      <Searchbut searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={result}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 15 }}
            onPress={() =>
              router.push(`/(tabs)/search/userProfile?user=${item.userId}`)
            }
          >
            <Text style={{ fontSize: 18 }}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default search;
