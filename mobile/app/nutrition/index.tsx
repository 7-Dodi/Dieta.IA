//Importações
import { View, Text, StyleSheet, Pressable, ScrollView, Share } from "react-native";
import { colors } from "@/constants/colors";
import {Ionicons, Feather} from "@expo/vector-icons"

//Compoenente
import { useDateStore } from "../../store/data";

//Manipulação de dados
import { api } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { DataType } from "@/components/types/dataType";
import { Link, router } from "expo-router";

interface ResponseData {
    data: DataType,
}

export default function Nutrition() {
    const user = useDateStore(state => state.user);

    const { data, isFetching, error } = useQuery({
        queryKey: ["nutrition"],
        queryFn: async () => {
            try {
                if (!user) {
                    throw new Error("User not found");
                }

                const response = await api.post<ResponseData>("/create", {
                    name: user.name,
                    weight: user.weight,
                    height: user.height,
                    age: user.age,
                    gender: user.gender,
                    objective: user.objective,
                    level: user.level
                });

                console.log(response.data.data);
                return response.data.data;
            } catch (error) {
                console.log(error);
            }
        }
    })

    if (isFetching) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
                <Text style={styles.loadingText}>Consultando a IA...</Text>
            </View>
        )
    }

    if(error){
        return(
            <View style={styles.container}>
                <Text style={styles.loadingText}>Error ao gerar a dieta!</Text>
                <Link href={"/step"}>
                    <Text style={styles.loadingText}>Tentar novamente...</Text>
                </Link>
            </View>
        )
    }

    //Função de compartilhamento
    async function handleShare() {
        try {
            //Caso não houver dados, não compartilha
            if (data && Object.keys(data).length === 0) return;

            const supplements = `${data?.suplementos.map(item=> `${item}`)}`;
            const foods = `${data?.refeicoes.map(item=> `\n- Nome: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: ${item.alimentos.map(item => `${item}`)}`)}`;

            const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n-Refeições: ${foods}\n\n-Dicas de suplementos: ${supplements}`
        
            //Compartilhando dieta
            await Share.share({
                message: message
            });
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>

                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Minha dieta</Text>

                    <Pressable style={styles.button} onPress={handleShare}>
                        <Text style={styles.buttonText}>Compartilhar</Text>
                    </Pressable>
                </View>
            </View>

            <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                {data && Object.keys(data).length > 0 && (
                    <>
                        <Text style={styles.name}>Nome: {data.nome}</Text>
                        <Text style={styles.objective}>Foco: {data.objetivo}</Text>

                        <Text style={styles.label}>Refeições: </Text>
                    </>
                )}
                <ScrollView style={{marginBottom: 24}}>

                    <View style={styles.foods}>
                        {data?.refeicoes.map((refeicao) => (
                            <View key={refeicao.nome} style={styles.food}>
                                <View style={styles.foodHeader}>
                                    <Text style={styles.foodName}>{refeicao.nome}</Text>
                                    <Ionicons name="restaurant" size={16} color={colors.black}/>
                                </View>

                                <View style={styles.foodContent}>
                                    <Feather name="clock" size={16} color={colors.black}/>
                                    <Text>Horário: {refeicao.horario}</Text>
                                </View>

                                <Text style={styles.foodTitle}>Alimentos:</Text>
                                {refeicao.alimentos.map((alimento => (
                                    <Text key={alimento}>{alimento}</Text>
                                )))}
                            </View>
                        ))}
                    </View>

                    <View style={styles.supplements}>
                        <Text style={styles.foodName}>Dicas de suplementos:</Text>
                        {data?.suplementos.map(item => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </View>

                    <Pressable style={styles.button} onPress={() => router.replace("/")}>
                        <Text style={styles.buttonText}>Gerar nova dieta</Text>
                    </Pressable>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    loading: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
    },

    loadingText: {
        fontSize: 18,
        color: colors.white,
        marginBottom: 4,
        justifyContent: "center",
        alignItems: "center"
    },

    containerHeader: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: 60,
        paddingBottom: 20,
        marginBottom: 16,
    },

    contentHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 16,
        paddingRight: 16,
    },

    title: {
        fontSize: 28,
        color: colors.background,
        fontWeight: "bold",
    },

    button: {
        backgroundColor: colors.blue,
        padding: 8,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: colors.white,
        fontWeight: "500",
    },

    name: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "bold",
    },

    objective: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 24,
    },

    label: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },

    foods: {
        backgroundColor: colors.white,
        padding: 14,
        borderRadius: 8,
        marginTop: 8,
        gap: 8,
    },

    food: {
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        padding: 8,
        borderRadius: 4,
    },

    foodHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 4,
    },

    foodName: {
        fontSize: 16,
        fontWeight: "bold",
    },

    foodContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },

    foodTitle: {
        fontSize: 16,
        marginBottom: 4,
        marginTop: 14,
    },
    supplements: {
        backgroundColor: colors.white,
        marginTop: 14,
        marginBottom: 14,
        padding: 14,
        borderRadius: 8
    },
})