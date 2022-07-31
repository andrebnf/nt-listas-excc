import { getMetadadosConteudo } from "../lib/exercises";


it('two plus two is four', () => {
  const metadadoAula = getMetadadosConteudo('turma1/modulo4/aula3/aula4_3.md')
  console.log(metadadoAula)
  expect(2 + 2).toBe(4);
});