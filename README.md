# **Dieta.AI**

[![Expo](https://img.shields.io/badge/Expo-^46.0.0-blue)](https://expo.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-^4.0.0-blue)](https://www.typescriptlang.org/) [![Fastify](https://img.shields.io/badge/Fastify-^4.0.0-brightgreen)](https://www.fastify.io/) [![Gemini AI](https://img.shields.io/badge/Gemini%20AI-Google%20API-yellow)](https://ai.google/tools/gemini/)

Dieta.AI é um aplicativo móvel para a geração de dietas personalizadas usando a inteligência artificial da Google, Gemini AI. O usuário insere suas informações como nome, idade, altura, peso, sexo, nível de atividade física e objetivos, e o sistema utiliza a IA para gerar uma dieta completa, com detalhes de alimentos, horários de alimentação e suplementos sugeridos.

## Índice

- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Funcionalidades](#funcionalidades)
- [Aviso Importante](#aviso-importante)

## Tecnologias

Este projeto utiliza as seguintes tecnologias:

### Front-end (Mobile):
- **React Native** com **Expo** para desenvolvimento da interface mobile.
- **TypeScript** para um código mais seguro e escalável.
  
### Back-end:
- **Fastify** para criação de uma API rápida e eficiente.
- **Gemini AI (Google)** para geração de dietas personalizadas via IA.

### Extras:
- **Axios** para realizar requisições HTTP entre o front-end e o back-end.
- **Node.js** no back-end para executar o Fastify.

## Instalação

### Pré-requisitos:

- **Node.js** (versão 18+)
- **Expo CLI**
- **Fastify**
- **Conta e credenciais do Google Cloud** para utilizar a Gemini AI.

### Passos para rodar o projeto localmente:

1. Clone o repositório:
    ```bash
    git clone https://github.com/7-Dodi/Dieta.IA.git
    cd Dieta.IA
    ```

2. Instale as dependências do front-end (Expo):
    ```bash
    cd mobile
    npm install
    ```

3. Instale as dependências do back-end (Fastify):
    ```bash
    cd backend
    npm install
    ```

4. Configure as variáveis de ambiente no backend (`.env`):
    - Defina suas chaves da API do Google Gemini AI.
     ```bash
    #API GEMINI AI
    API_KEY=your-key-gemini
    ```
    
5. Rode o back-end:
    ```bash
    npm run dev
    ```

6. Rode o aplicativo mobile:
    ```bash
    cd mobile
    npx expo start
    ```

## Funcionalidades

- **Geração de dietas personalizadas**: Com base nos dados fornecidos, a Gemini AI gera uma dieta otimizada para o usuário, detalhando os alimentos, horários e suplementos.

## Aviso Importante

Este repositório faz parte de um estudo de aplicação de tecnologias em um projeto de geração de dietas utilizando inteligência artificial. As dietas geradas pelo aplicativo **Dieta.AI** têm caráter informativo e educacional e **não devem ser consideradas como aconselhamento médico ou nutricional profissional**.

Antes de iniciar qualquer dieta ou regime alimentar, consulte um **médico** ou **nutricionista** para obter orientações adequadas de acordo com sua saúde e necessidades individuais.

As informações geradas pelo sistema podem não refletir recomendações precisas ou personalizadas e **não substituem o diagnóstico e acompanhamento de um profissional de saúde**.
