## Organização dos Arquivos

É essencial que os arquivos de conteúdo estejam organizados nesta estrutura:

```
_conteudo
├── turma1
│   └── modulo4
│       ├── aula3
│       │   ├── aula.md
│       │   ├── ex1.md
│       │   └── ex2.md
│       └── aula4
│           ├── aula.md
│           └── ex1.md
└── turma2
    └── modulo1
        └── aula1
            ├── aula.md
            └── ex1.md
```

⚠️ Importante:
- Somente os níveis acima (Turma > Modulo > Aula > arquivo) são suportados
- Os arquivos precisam necessariamente iniciar com 'aula' ou 'ex', como no exemplo acima

## Como escrever um arquivo de conteúdo

Exemplo de conteúdo:
```
---
titulo: "Aula: Utilidades"
breadcrumb: "Módulo 4 > Aula 3: Inspeção de Código (debug)"
codigoInicial: |
  console.log("Olá, mundo")
  let alunos = ["Dani", "Giovanna", "Nicollas"];

  let pessoas = [
    { nome: "Ana",     idade: 23 },
    { nome: "Eduardo", idade: 31 },
    { nome: "Pedro",   idade: 12 },
    { nome: "Renata",  idade: 9 },
  ];
---

Este é o enunciado do exercício ou o texto da aula. Este conteúdo suporta Markdown
```

Propriedades no cabeçalho do arquivo:
- `titulo`: nome que vai aparecer na Sidebar e no topo da página deste conteúdo
- `breadcrumb`: mostra dentro de qual aula e modulo o conteudo está
- `codigoInicial`: código que estará presente no editor de código quando o conteúdo for aberto pela primeira vez

## Subindo as alterações

Para continuar, siga as instruções aqui: [Guia de Contribuição do Repositório](./contribui%C3%A7%C3%B5es.md).