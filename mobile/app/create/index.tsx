//Importações
import { View, Image, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from "../../constants/colors";

//Componentes
import { Header } from "@/components/header";
import {useDateStore} from "../../store/data";
import { Select } from "@/components/Input/select";
import { genderOptions } from "@/components/types/genderTypes";
import { levelOptions } from "@/components/types/levelTypes";
import { objectiveOptions } from "@/components/types/objectiveTypes";

//Validação
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { router } from "expo-router";

//Schema de validação
const schema = z.object({
    gender: z.string().min(1, { message: "O gênero é obrigatório" }),
    objective: z.string().min(1, { message: "O objetivo é obrigatório" }),
    level: z.string().min(1, { message: "Selecione o seu level" }),
});

type FormData = z.infer<typeof schema>;

//Componente
export default function create() {

    //UseForm
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    //Pegando o controlador de dados
    const setPageTwo = useDateStore(state => state.setPageTwo)

    const handleCreate = (data: FormData) => {
        console.log(data);

        setPageTwo({
            gender: data.gender,
            level: data.level,
            objective: data.objective
        });

        router.push("/nutrition");

    }

    return (
        <View style={styles.container}>
            <Header step="Passo 2" title="Finalizando dieta" />

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Nome:</Text>
                <Select
                    name="gender"
                    control={control}
                    error={errors.gender?.message}
                    placeholder="Selecione o seu sexo..."
                    options={genderOptions}
                />

                <Text style={styles.label}>Selecione seu nível de atividade física:</Text>
                <Select
                    name="level"
                    control={control}
                    error={errors.level?.message}
                    placeholder="Selecione o seu nível de atividade física..."
                    options={levelOptions}
                />

                <Text style={styles.label}>Selecione seu objetivo:</Text>
                <Select
                    name="objective"
                    control={control}
                    error={errors.objective?.message}
                    placeholder="Selecione o seu objetivo..."
                    options={objectiveOptions}
                />

                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>Gerar Dieta</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        paddingLeft: 16,
        paddingRight: 16,
    },

    label: {
        fontSize: 16,
        color: colors.white,
        fontWeight: "bold",
        marginBottom: 8,
    },

    button: {
        backgroundColor: colors.blue,
        height: 44,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    }
})