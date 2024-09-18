//Importações
import { View, Image, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from "../../constants/colors";
import { router } from "expo-router";

//Componentes
import { Header } from "@/components/header";
import { Input } from "@/components/Input";
import {useDateStore} from "../../store/data";

//Validação
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//Schema de validação
const schema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório" }),
    weight: z.string().min(1, { message: "O peso é obrigatório" }),
    age: z.string().min(1, { message: "A idade é obrigatório" }),
    height: z.string().min(1, { message: "A altura é obrigatório" }),
});

type FormData = z.infer<typeof schema>;

//Componente
export default function Step() {

    //UseForm
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    //Pegando o controlador de dados
    const setPageOne = useDateStore(state => state.setPageOne)

    //Função de submit
    const handleCreate = (data: FormData) => {
        setPageOne({
            name: data.name,
            age: data.age,
            height: data.height,
            weight: data.weight
        })
        router.push("/create");
    }

    return (
        <View style={styles.container}>
            <Header step="Passo 1" title="Vamos começar" />

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Nome:</Text>
                <Input
                    name="name"
                    control={control}
                    placeholder="Digite seu nome..."
                    error={errors.name?.message}
                    keyboardType="default"
                />

                <Text style={styles.label}>Seu peso atual:</Text>
                <Input
                    name="weight"
                    control={control}
                    placeholder="Ex: 75"
                    error={errors.weight?.message}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Sua altura atual:</Text>
                <Input
                    name="height"
                    control={control}
                    placeholder="Ex: 1.90"
                    error={errors.height?.message}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Sua idade atual:</Text>
                <Input
                    name="age"
                    control={control}
                    placeholder="Ex: 24"
                    error={errors.age?.message}
                    keyboardType="numeric"
                />
           
                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>
           
            </ScrollView>

        </View>
    )
};

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