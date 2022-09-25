export class AlgorithmStep {
  constructor(parameters?) {}
}

export abstract class ArrayAlgorithmStep extends AlgorithmStep {
  abstract run(data: any[], i: number, j: number): Promise<any>;
}
