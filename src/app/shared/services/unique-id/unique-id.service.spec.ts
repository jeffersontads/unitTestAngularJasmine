import { UniqueIdService } from './unique-id.service';

//ao colocar o .name depois do nome da funcao a ser testada grantimos que quando muderem o nome desta
// funcao o mesmo nao sera trocado no teste e sempre mantera o mesmo. (pode ser adotado no JEST)
describe(UniqueIdService.name, () => {
  /**
   * beforeEach ANTES DE EXECUTAR CADA TESTE ELE MUDA O VALOR DA VARIAVEL service
   * Tem como papel principal garantir que cada chamada à função it tenha seu próprio conjunto de dados de teste
   * pra isso que serve o beforeEach assim temos service ouniqueserviceid dentro de todos os its
   */
  let service: UniqueIdService = null;
  beforeEach(() => {
    service = new UniqueIdService();
  });
  // da mesma forma que no describe aqui tambem usamos esta padrao para dizer op que estamos testando.
  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should generate id when called with prefix`, () => {
    //preciso testar se a funcao esta gerando novos ids conforme implementada no arquivo TS
    //para isso eu crio um const com a instancia da funcao que gera IDS
    const id = service.generateUniqueIdWithPrefix('app');

    // minha expectativa é que o id comece com app porque é o prefixo é o esperado
    // expect(id).toContain('app-');
    // é necessario fazer os testes mais especificos possiveis porque pode dar o falso positivo
    expect(id.startsWith('app-')).toBeTrue();

    //espera sempre o tipo literal primitivo true ou false
    expect(true).toBeTrue();

    //compara se um valor é igual a outro ou se um valor pode ser null false ou true
    expect(true).toBe(true);

    //bem abrangente
    expect(true).toBeTruthy();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should not
  generate duplicate IDs when called multiple times`, () => {
    // const firstId = service.generateUniqueIdWithPrefix('app');
    // const secondId = service.generateUniqueIdWithPrefix('app');

    const ids = new Set();

    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }

    // expect(firstId).not.toBe(secondId);

    expect(ids.size).toBe(50);
  });
  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
  should return the number of generateIds WHEN called`, () => {
    service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');

    expect(service.getNumberOfgeneratedIds()).toBe(2);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    Should trow WHEN called with empty `, () => {
    /**
     * Quando você ta chamando um metedo e você quer que  testar se ele lance uma execcão então voce coloca
     * ele dentro de uma função, passando ele dentro de uma arrow function
     * withContext ou seja quando o teste falhar ele vai mostar o que esta falhando (app) qual valor que esta falhando
     */

    const emptyValues = [null, undefined, ''];
    emptyValues.forEach((emptyValue) => {
      expect(() => service.generateUniqueIdWithPrefix(emptyValue))
        .withContext(`Empty value: ${emptyValue}`)
        .toThrow();
    });
  });
});
