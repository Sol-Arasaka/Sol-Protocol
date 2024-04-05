import { BN } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

export const programID = new PublicKey('3HuN3uYw1h33gUyJwoy1vRaNLEijd782ceLQPgSCk9b4') // this is for test

interface ProposePDA {
  publicKey: PublicKey
  proposalId: number
}

export const getProposePDA = ({ publicKey, proposalId }: ProposePDA) => {
  const [vaultPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('propose'), publicKey.toBuffer(), new BN(proposalId).toArrayLike(Buffer, 'le', 8)],
    programID
  )
  return vaultPDA
}

interface AssertPDA {
  publicKey: PublicKey
  proposalId: number
  assertId: number
}

export const getAssertPDA = ({ publicKey, proposalId, assertId }: AssertPDA) => {
  const [vaultPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('assert'),
      publicKey.toBuffer(),
      new BN(assertId).toArrayLike(Buffer, 'le', 8),
      new BN(proposalId).toArrayLike(Buffer, 'le', 8)
    ],
    programID
  )
  return vaultPDA
}

interface ChallengeAssertPDA {
  publicKey: PublicKey
  proposalId: number
  challengeId: number
}

export const getChallengeAssertPDA = ({ publicKey, proposalId, challengeId }: ChallengeAssertPDA) => {
  const [vaultPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('challengeAssert'),
      publicKey.toBuffer(),
      new BN(challengeId).toArrayLike(Buffer, 'le', 8),
      new BN(proposalId).toArrayLike(Buffer, 'le', 8)
    ],
    programID
  )
  return vaultPDA
}

export type SolProtocol = {
  version: '0.1.0'
  name: 'sol_protocol'
  instructions: [
    {
      name: 'propose'
      accounts: [
        { name: 'authority'; isMut: true; isSigner: true },
        { name: 'proposalAccount'; isMut: true; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ]
      args: [
        { name: 'id'; type: 'u64' },
        { name: 'proposalName'; type: 'string' },
        { name: 'rewardAmount'; type: 'u64' }
      ]
    },
    {
      name: 'assert'
      accounts: [
        { name: 'authority'; isMut: true; isSigner: true },
        { name: 'proposalAccount'; isMut: true; isSigner: false },
        { name: 'assertionAccount'; isMut: true; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ]
      args: [{ name: 'id'; type: 'u64' }, { name: 'answer'; type: 'bool' }, { name: 'proposalId'; type: 'u64' }]
    },
    {
      name: 'challengeAssert'
      accounts: [
        { name: 'authority'; isMut: true; isSigner: true },
        { name: 'proposalAccount'; isMut: true; isSigner: false },
        { name: 'assertionAccount'; isMut: true; isSigner: false },
        { name: 'challengeAssertionAccount'; isMut: true; isSigner: false },
        { name: 'systemProgram'; isMut: false; isSigner: false }
      ]
      args: [{ name: 'id'; type: 'u64' }, { name: 'proposalId'; type: 'u64' }, { name: 'assertId'; type: 'u64' }]
    }
  ]
  accounts: [
    {
      name: 'ProposalAccount'
      type: {
        kind: 'struct'
        fields: [
          { name: 'id'; type: 'u64' },
          { name: 'owner'; type: 'publicKey' },
          { name: 'proposalName'; type: 'string' },
          { name: 'rewardAmount'; type: 'u64' },
          { name: 'assertAt'; type: 'i64' }
        ]
      }
    },
    {
      name: 'AssertionAccount'
      type: {
        kind: 'struct'
        fields: [
          { name: 'id'; type: 'u64' },
          { name: 'proposalKey'; type: 'publicKey' },
          { name: 'preAssertKey'; type: 'publicKey' },
          { name: 'owner'; type: 'publicKey' },
          { name: 'answer'; type: 'bool' },
          { name: 'assertAmount'; type: 'u64' },
          { name: 'assertAt'; type: 'i64' }
        ]
      }
    }
  ]
  errors: [{ code: 6000; name: 'AlreadyAsserted'; msg: 'Already asserted' }, { code: 6001; name: 'NotYetAsserted' }]
  metadata: { address: '3Y1UEAKRVuRr4qX8KN4UxhbhaACVCyskbDushd2Ud2FY' }
}
