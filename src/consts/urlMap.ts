const network = {
  testnet: {
    rpc: 'https://public-en-kairos.node.kaia.io',
    scope: 'https://kairos.kaiascope.com/tx/',
    finder: 'https://kairos.kaiascan.io/tx/',
    finderToken: 'https://kairos.kaiascan.io/token/',
    finderNFT: 'https://kairos.kaiascan.io/nft/',
  },
  mainnet: {
    rpc: 'https://public-en.node.kaia.io',
    scope: 'https://kaiascope.com/tx/',
    finder: 'https://kaiascan.io/tx/',
    finderToken: 'https://kaiascan.io/token/',
    finderNFT: 'https://kaiascan.io/nft/',
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
