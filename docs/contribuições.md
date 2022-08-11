# Guia de Contribuição nt-listas-excc

Antes de contribuir para este repositório, por favor leia este guia.

## Sobre os Ambientes e Entrega contínua
O repositório utiliza o serviço da [Vercel](https://vercel.com/) para disponibilizar o site usando o conceito de entrega contínua. Atualmente temos 3 ambientes na Vercel: **produção** (entregável para o usuário final), o ambiente de **prévia** (ambiente similar ao de produção porém o usuário final não terá acesso a este ambiente). Há também um ambiente de **staging**, similar ao de prévia e que, ao contrário do convencional, utiliza recursos de produção (Firestore, Firebase Auth).

#### Produção

Quando a branch principal do repositório (`main`) é atualizada, Vercel automaticamente atualiza o site de produção. Logo, durante a fase de desenvolvimento, é proibido subir alterações direto na branch `main`. A única forma de uma alteração ir para a branch `main` é através de um Pull Request.

### Prévia

Quando um Pull Request é aberto no GitHub, um serviço da Vercel vai fazer o deploy da sua branch no ambiente de **prévia** e vai retornar um link no próprio Pull Request para a versão do site online utilizando o código novo. Porém, nesta versão, não será possível login com o Google, isto ocorre porque uma nova URL é gerada para o Pull Request e essa nova URL tem que ser cadastrada manualmente no painel do Firebase. Se necessário testar suas alterações com o Login do Google, utilize o ambiente de **staging**.

### Staging

Para utilizar o ambiente de **staging**, faça o merge de suas alterações para branch `staging`. Isto vai gerar o processo de build na Vercel. Para visitar a nova versão vá para https://nt.bonfatti.dev.

Veja mais detalhes do fluxo de desenvolvimento abaixo:

## Modificar o código

> ⚠️ Antes de qualquer modificação, peça para os voluntários do Núcleo de Tecnologia acesso de contribuidor neste projeto.

Existem 2 maneiras de alterar o código: pela interface do GitHub ou baixando o projeto no seu computador.

### Opção 1: Alterando o código através da interface do GitHub:

1. Abra o arquivo que você deseja editar: 
![image](https://user-images.githubusercontent.com/1435403/178538878-9f71666a-551c-4fe1-8a9c-064502d2706d.png)
1. Ou se deseja criar um arquivo novo, vá até a página da pasta e clique em Novo Arquivo: 
![image](https://user-images.githubusercontent.com/1435403/178539609-f540c7c1-aa8b-4e30-8401-93945b1b757e.png)
1. Execute as alterações no arquivo utilizando o editor de texto do GitHub.
1. Quando finalizar as alterações, role até a parte inferior da página. Lá você verá algumas opções e também um botão escrito "Propor Mudanças". Ao preencher as opções, utilize a escolha "Criar uma nova branch para este commit e inicie um Pull Request". Dê um nome para usa branch no input de texto disponível abaixo desta opção (o nome não pode ser `main` ou algum outro nome de branch já existente no GitHub). Exemplo: 
![image](https://user-images.githubusercontent.com/1435403/178541542-da3d9276-e97f-4f8b-a934-5400281f6cfb.png)
1. Preencha os campos de Título e Descrição (opcionais, mas desejáveis) 
1. Pressione o botão "Propor Mudanças". Essa ação resultará na criação de um Pull Request
1. Vá até a [página de Pull Requests](https://github.com/andrebnf/nt-listas-excc/pulls)
1. Clique em "New Pull Request"
1. Dois seletores de branch serão apresentados. Selecione `main` na opção "base" caso queira que suas alterações vão direto para o ambiente de produção. Caso queira testar em staging, utilize `staging` nesta primeira opção. Na opção "compare" selecione sua branch criada anteriormente
1. Na página do Pull Request, revise as mudanças (ou peça ajuda na revisão para outros instrutores do Curso Online)
1. Na página do Pull Request será informado um link com a prévia das alterações daquele Pull Request. Visite este link e utilize o site, revisando o conteúdo ou funcionalidades novas adicionadas
1. Faça o merge do Pull Request. Após esta ação, aguarde alguns minutos e verifique se o site em produção foi alterado corretamente.

### Opção 2: Fluxo de trabalho desenvolvendo na sua máquina local:

1. Configure seu ambiente de desenvolvimento (veja o guia de instalação)
1. Clone o repositório
1. Crie uma nova branch com um nome qualquer (o nome **não pode** ser: `main`, `staging`, ou [algum outro nome de branch já existente no GitHub](https://github.com/andrebnf/nt-listas-excc/branches))
1. Execute as alterações no código
1. Adicione suas alterações no git
1. Suba sua branch com o código alterado para o GitHub
1. Abra um novo Pull Request com seu código (se necessário testar em staging, mude a branch de destino de `main` para `staging`)
1. Na página do Pull Request, revise as mudanças (ou peça ajuda na revisão para outros instrutores do Curso Online)
1. Na página do Pull Request será informado um link com a prévia das alterações daquele Pull Request. Visite este link e utilize o site, revisando o conteúdo ou
funcionalidades novas adicionadas
1. Faça o merge do Pull Request. Após esta ação, aguarde alguns minutos e verifique se o site em produção foi alterado corretamente.
