# Executando o projeto no ambiente local (desenvolvimento)

Vá até a sessão do seu sistema para instruções detalhadas.

## Windows com Subsistema Linux (WSL)

### 1. Verificando a versão do Windows:
1. Pressione `Tecla do Windows + R` para abrir a janela "Execução" do Windows. Nesta janela, digite `msinfo32` e pressione `Enter`
1. Na janela "Informações do Sistema" que abrirá, encontre o item "Versão" no painel do lado direito. O valor deste campo será algo como `10.0.22000 Build 22000`
1. Se o número da build for superior a `19041`, que é o caso deste exemplo, pule para a sessão [3. Instalando o Ubuntu no Windows](#3-instalando-o-ubuntu-no-windows). Caso o valor seja inferior a `19041`, siga na sessão [2. Configurando o WSL](#2-configurando-o-wsl)

### 2. Configurando o WSL

Para configurar o WSL, siga a [documentação oficial da Microsoft](https://docs.microsoft.com/pt-br/windows/wsl/install).

### 3. Instalando o Ubuntu no Windows

1. Abra o programa "Windows PowerShell" com permissões de administrador
1. No terminal, digite `wsl --install -d Ubuntu`
1. Acompanhe a instalação

### 4. Configurando o Terminal do Windows

> Você pode pular esta etapa e simplesmente executar o programa "Ubuntu no Windows" que foi instalado no seu computador. Porém, muitas funcionalidades extras de um emulador de terminal moderno, como abas e multiplos painéis, não estarão disponíveis.

Verifique se o programa [Terminal](https://docs.microsoft.com/pt-br/windows/terminal) está instalado no seu computador. Se não estiver, [faça o download aqui](https://docs.microsoft.com/pt-br/windows/terminal/install).

Para configurar o Terminal para utilizar o Ubuntu, abra o Terminal e siga os passos:
1. pressione `Alt esquerdo + Barra de espaço` 
1. selecione "Configurações" 
1. na tela que se abre são apresentadas as configurações de início do terminal (startup). Neste painel, o primeiro item aponta qual perfil está sendo utilizado (o padrão é `Windows PowerShell`). Altere o perfil padrão para `Ubuntu`

### 5. Validando a Instalação e Próximos passos

Abra o terminal do Ubuntu e execute o comando:
```
uname -a
```
Exemplo de retorno: `Linux nome-do-computador 5.10.16.3-microsoft-standard-WSL2 #1 SMP ...`

Neste ponto seu ambiente está configurado e você pode seguir o [guia de instalação para o Linux abaixo](#linux-ubuntu). Antes, algumas dicas:
- Seu usuário padrão deverá ter permissões de administrador (ex: para rodar comandos com `sudo`). Para checar o nome do usuário no Ubuntu, execute `whoami`.
- O editor sugerido para este ambiente é o [Visual Studio Code](https://code.visualstudio.com/) por se integrar bem com o WSL.

## Linux (Ubuntu)

**Pré-requisitos:**
- projeto clonado no seu computador
- Node versão 16 ou 18: Instale através do [Website oficial](https://nodejs.org/pt-br/) ou através do Gerenciador de Versões do Node ([nvm](https://github.com/nvm-sh/nvm))
- git

**Executando o projeto:**
1. navegue até a pasta do projeto
1. instale dependências com `npm install`
1. execute o servidor de desenvolvimento com `npm run dev`. Este comando abrirá uma aba no seu navegador com o projeto local. Em geral, o endereço do seu site é: `http://localhost:3000/`
1. para iniciar suas alterações no repositório, lembre-se de criar uma branch nova utilizando o git: `git checkout -b nome-da-nova-branch`. Para mais detalhes, acesse o [guia de contribuição para o repositório](./contribui%C3%A7%C3%B5es.md)

Pronto. Agora qualquer alteração no código surtirá efeito na página local do projeto.

**Executando os testes**
```
npm run test
```
ou, para não "travar" o console: 
```
npm run test:ci
```

**Executando o processo de build:**
> Este processo é útil para validar que nosso código está válido para o passo de build (o comando `npm run dev` não executa completamente este passo)

1. na pasta do projeto, execute `npm run build`
1. após finalizado o processo de build, execute `npm run start -p 3001`
1. no seu navegador, visite `http://localhost:3001` para abrir a versão final do site
