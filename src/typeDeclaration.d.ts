declare module "typeDeclaration" {
  function head<G>(array: G[]): G;
  function hasIn(object: Object, key: string): boolean;
  function isBoolean(value?: any): boolean;
  function toString(value?: any): string;
  function split(
    string: string,
    separator: RegExp | string,
    limite: number
  ): string[];
  function hasPath<G>(object: Object, path: G[] | string): boolean;
  function filter<G>(array: G[], predicate: Function): G[];
  function every<G>(array: G[], predicate: Function): boolean;
  function map<G>(array: G[], iteratee: Function): G[];
}
