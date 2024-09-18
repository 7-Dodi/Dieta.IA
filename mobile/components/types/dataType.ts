//Tipo de dado refeição
export interface refeicoes {
    horario: string,
    nome: string,
    alimentos: string[]
}


//Tipo de dado retornado
export interface DataType {
    nome: string,
    sexo: string,
    idade: number,
    altura: number,
    objetivo: string,
    refeicoes: refeicoes[]
    suplementos: string[]
}