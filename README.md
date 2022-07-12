> Acesse o site aqui: https://nt-listas-excc.vercel.app/ (branch `main`, produção)

Repositório do Website do Curso Online - Núcleo de Tecnologia MTST

## Contribuindo para o repositório

Para entender o fluxo de contribuição (fluxo git) e deploy (entrega contínua), acesse o [Guia de Contribuição do Repositório](docs/contribui%C3%A7%C3%B5es.md)

## Configurando e Executando o projeto no seu computador

Para configurar e executar o projeto no seu computador, acesse o guia [Executando o projeto no ambiente local](./docs/executando%20local.md)

## Stack do projeto

### Next.js (React)

O Next é um framework de desenvolvimento e construção de artefatos entregáveis. O Next utiliza React junto com funcionalidades executadas no Servidor (Server Side Rendering). É importante entender as premissas do framework para entender este projeto. Para isto, uma sugestão é começar pela [plataforma de aprendizado Next.js](https://nextjs.org/learn) (infelizmente disponível somente em inglês. Se necessário, traduza as páginas utilizando seu navegador e isto deve ser suficiente para entender sobre o Next.js)

### Firebase

Algumas variáveis de ambiente são necessárias para usar funcionalidades do Firebase como autenticação e banco de dados (Firestore). Para isso, crie um arquivo chamado `.env.local` com o conteúdo abaixo e substitua os exemplos por seus valores de configuração de aplicação no Firebase:


```shell
# Arquivo .env.local

NEXT_PUBLIC_FIREBASE_API_KEY=exemploDeApiKey
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=exemploDeAuthDomain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=exemploDeProjectId
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=exemploDeStorageBucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=exemploDeMessagingSenderId
NEXT_PUBLIC_FIREBASE_APP_ID=exemploDeAppId
```

### TypeScript

É a linguagem oficial deste repositório. Novos componentes React devem usar o formato de arquivo `.tsx` informando que é um componente contendo HTML, TypeScript e estilos (mais detalhes na sessão [`styled-components`](#styled-components)).

A Microsoft (manutenedora do TypeScript) disponibiliza um [curso interativo de graça](https://docs.microsoft.com/pt-br/learn/modules/typescript-get-started/) para começar com a linguagem (disponível em português), explicando as motivações e premissas da linguagem além dos exemplos de código.

Além disto, para consultar referências sobre a linguagem, vá para a [documentação oficial do Typescript](https://www.typescriptlang.org/pt/docs/) (boa parte do conteúdo está em português).

### Monaco Editor

O projeto utiliza um editor de código para os alunos resolverem os exercícios, o [Editor Monaco](https://microsoft.github.io/monaco-editor/) (uma versão do editor do Visual Studio Code disponibiliza pela Microsoft).

O editor é utilizado através do pacote [monaco-react](https://github.com/suren-atoyan/monaco-react).

### Styled Components

O padrão para criar estilos (CSS) neste projeto é através do pacote [`styled-components`](https://styled-components.com/).

Com `styled-components` o CSS é manipulado junto com Typescript e são tratados como componentes do React (técnica conhecida como CSS-in-JS). A biblioteca também se integra bem com o Next, fazendo com que parte do estilo seja otimizado e renderizado no servidor.

Para utilizar `styled-components` no Visual Studio Code, utilize a extensão [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components) para destacar corretamente o CSS nos arquivos de componentes React.
