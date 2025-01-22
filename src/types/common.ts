export type NominalType<T extends string> = { __type: T }

export enum QueryKeyEnum {
  NETWORK = 'NETWORK',
}

export type NetworkType = 'ethereum' | 'sepolia' | 'kaia' | 'kairos'
