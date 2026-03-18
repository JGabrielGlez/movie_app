import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  // Hooks empiezan con "use" y son comunmente llamados al inicio, como en este archivo
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: movieError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    }),
  );
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}>
        <Image source={icons.logo} className="mx-auto mb-5 mt-20 h-10 w-12" />

        {/* Se renderizarán las películas  */}
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : movieError ? (
          <Text>Error: ${movieError?.message}</Text>
        ) : (
          <View className="mt-5 flex-1">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            <>
              <Text className="mb-3 mt-5 text-lg font-bold text-white">
                Latest movies
              </Text>

              <FlatList
                className="mt-2 pb-32"
                scrollEnabled={false}
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                // El keyExtractor ayuda a que reeact-native sepa cuántos elementos hay y cuál es su posición
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
