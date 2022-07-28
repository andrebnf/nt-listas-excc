Pull Request exemplo demonstrando o que deve ser feito para adicionar um novo conteúdo: https://github.com/andrebnf/nt-listas-excc/pull/1.

## Passos:

### Passo 1: Leia o guia de contribuição.

Neste passo-a-passo vamos alterar o repositório de código atual para adicionar um exercício. Para que esta alteração tenha efeito para o usuário final, é necessário seguir o guia de contribuição do repositório. No passo do guia de contribuição que diz "Execute as mudanças no repositório", volte para o passo 2 deste Pull Request de exemplo.

### Passo 2: Crie um arquivo para o exercício

Crie um arquivo com a extensão `.md` (formato Markdown) na pasta `_exercises`, na raíz do projeto. O nome do arquivo deve seguir o padrão: `ex<número do módulo>_<número da aula>_<identificador do exercício>.md`, onde o número da aula pode ser vazio. Exemplo de nomes válidos para os arquivos:
- ex1_2_1.md
- ex1_2_bonus.md
- ex1_2_projeto.md
- ex1_projeto.md

> Nota: o código não trata o nome dos arquivos, então qualquer nome deve funcionar, com ou sem padrão. A sugestão acima tem a finalidade de manter um padrão dada a estrutura atual do curso online e para facilitar a manutenção dos exercícios existentes.

### Passo 3: Crie o cabeçalho do arquivo Markdown

Nas primeiras linhas do novo arquivo criado, adicione o seguinte texto:
```
---
title: 'Ex. Exemplo'
breadcrumb: 'Módulo X > Aula X > Execício Exemplo'
---
```

Esses 3 traços (`---`) da primeira linha indicam o início do bloco de metadados e os últimos 3 traços indicam o fechamento do bloco. O formato Markdown é ótimo para a criação de documentação e conteúdos (prática comum para blogs de pequeno/médio porte. Os metadados são informações que ficam escondidas do usuário, mas podem ser acessados facilmente pelo código da aplicação.

Nesta aplicação, atualmente temos 2 metadados: `title` e `breadcrumb`. **Title** se refere ao título do exercício que será exibido no menu lateral e também acima da descrição do exercício. **Breadcrumb** se refere ao momento do curso que o exercício está (módulo, aula) e tem a finalidade de situar o usuário quando este visualizar os exercícios.

### Passo 4: Adicione o enunciado do exercício

Abaixo do bloco de metadados, adicione o texto do exercício. Segue um exemplo do enunciado:
```
---
title: 'Ex. Exemplo'
breadcrumb: 'Módulo X > Aula X > Execício Exemplo'
---

Olá, este é um exemplo de enunciado. Pode-se usar os estilos: *itálico*, **negrito** entre outros. Todas as
funcionalidades do Markdown são aceitas neste enunciado, incluindo bloco de código (usando ```) e links.
Consulte mais detalhes sobre Markdown aqui: https://livreeaberto.com/guia-markdown
```

### Passo 5: Suba as alterações para o GitHub e para o usuário final

Volte ao guia de contribuição e retome no passo: "Subindo as alterações para **prévia** e **produção**" (esta etapa é idêntica para qualquer tipo de alteração no repositório do sistema).
