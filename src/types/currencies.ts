import { NominalType } from './common'

export enum TokenSymbolEnum {
  KAIA = 'KAIA',
}

export type pToken = string & NominalType<'pToken'>

export type uToken = string & NominalType<'uToken'>

export type Token = string & NominalType<'Token'>
