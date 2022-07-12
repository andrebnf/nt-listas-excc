# Guia de Contribuição nt-listas-excc

Antes de contribuir para este repositório, por favor leia este guia.

## Sobre entrega contínua
O repositório utiliza o serviço da [Vercel](https://vercel.com/) para disponilizar o site usando o conceito de entrega contínua. Atualmente temos 2 ambientes
na Vercel: **produção** (entregável para o usuário final) e o ambiente de **prévia** (ambiente similar ao de produção porém o usuário final não verá este 
ambiente).

Quando a branch principal do repositório (`main`) é atualizada, Vercel automaticamente atualiza o site de produção. Logo, durante a fase de desenvolvimento, é proibido
subir alterações direto na branch `main`. A única forma de uma alteração ir para a branch `main` é através de um Pull Request.

## Alterar o código

Existem 2 maneiras de alterar o código: pela interface do GitHub ou baixando o projeto no seu computador.

### Opção 1: Alterando o código através da interface do GitHub:

1. Abra o arquivo que você deseja editar: 

![image](https://user-images.githubusercontent.com/1435403/178538878-9f71666a-551c-4fe1-8a9c-064502d2706d.png)

2. Ou se deseja criar um arquivo novo, vá até a página da pasta e clique em Novo Arquivo:

![image](https://user-images.githubusercontent.com/1435403/178539609-f540c7c1-aa8b-4e30-8401-93945b1b757e.png)

3. Execute as alterações no arquivo utilizando o editor de texto do GitHub.
4. Quando finalizar as alterações, role até a parte inferior da página. Lá você verá algumas opções e também um botão escrito "Propor Mudanças". Ao preencher as 
opções, utilize a escolha "Criar uma nova branch para este commit e inicie um Pull Request". Dê um nome para usa branch no input de texto disponível abaixo desta opção.
Exemplo:
![image](https://user-images.githubusercontent.com/1435403/178541542-da3d9276-e97f-4f8b-a934-5400281f6cfb.png)
1. Preencha os campos de Título e Descrição (opcionais, mas desejáveis para novas funcionalidades ou modificações complexas) 
2. Pressione o botão "Propor Mudanças". Essa ação resultará na criação de um Pull Request
3. Na págian do Pull Request, revise as mudanças (ou peça ajuda na revisão para outros instrutores do Curso Online)
4. Na págian do Pull Request será informado um link com a prévia das alterações daquele Pull Request. Visite este link e utilize o site, revisando o conteúdo ou
funcionalidades novas adicionadas
1. Faça o merge do Pull Request. Após esta ação, aguarde alguns minutos e verifique se o site em produção foi alterado corretamente.

### Opção 2: Fluxo de trabalho desenvolvendo na sua máquina local:

1. Configure seu ambiente de desenvolvimento (veja o guia de instalação)
1. Clone o repositório
1. Crie uma nova branch
1. Execute as alterações no código
1. Adicione suas alterações no git
1. Suba sua branch com o código alterado para o GitHub
1. Abra um novo Pull Request com seu código
1. Na págian do Pull Request, revise as mudanças (ou peça ajuda na revisão para outros instrutores do Curso Online)
1. Na págian do Pull Request será informado um link com a prévia das alterações daquele Pull Request. Visite este link e utilize o site, revisando o conteúdo ou
funcionalidades novas adicionadas
1. Faça o merge do Pull Request. Após esta ação, aguarde alguns minutos e verifique se o site em produção foi alterado corretamente.
