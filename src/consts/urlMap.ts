const network = {
  testnet: {
    rpc: 'https://klaytn-baobab.g.allthatnode.com/full/evm',
    scope: 'https://baobab.scope.klaytn.com/tx/',
    finder: 'https://baobab.klaytnfinder.io/tx/',
    finderToken: 'https://baobab.klaytnfinder.io/token/',
    finderNFT: 'https://baobab.klaytnfinder.io/nft/',
  },
  mainnet: {
    rpc: 'https://klaytn-mainnet.g.allthatnode.com/full/evm',
    scope: 'https://scope.klaytn.com/tx/',
    finder: 'https://www.klaytnfinder.io/tx/',
    finderToken: 'https://www.klaytnfinder.io/token/',
    finderNFT: 'https://www.klaytnfinder.io/nft/',
  },
}

const kip = {
  'KIP-7': 'https://kips.kaia.io/KIPs/kip-7',
  'KIP-17': 'https://kips.kaia.io/KIPs/kip-17',
  'KIP-37': 'https://kips.kaia.io/KIPs/kip-37',
}

export default {
  network,
  kip,
}
