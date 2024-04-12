import * as borsh from '@coral-xyz/borsh';

export interface Proposal {
  id: number;
  owner: string;
  proposal_name: string;
  reward_amount: number;
  assert_at: number;
}

export interface Assertion {
  id: number;
  proposal_key: string;
  pre_assert_key: string;
  owner: string;
  answer: boolean;
  assert_amount: number;
  assert_at: number;
}

export function proposalDeserialization(buffer?: Buffer): Proposal | null {
  if (buffer) {
    try {
      const borshSchema = borsh.struct([
        borsh.u64('id'),
        borsh.publicKey('owner'),
        borsh.str('proposal_name'),
        borsh.u64('reward_amount'),
        borsh.i64('assert_at'),
      ]);
      const { id, owner, proposal_name, reward_amount, assert_at } = borshSchema.decode(buffer);
      return { id, owner, proposal_name, reward_amount, assert_at };
    } catch (error) {
      console.error('Deserialization error:', error);
      return null;
    }
  }
  return null;
}

export function assertionDeserialization(buffer?: Buffer): Assertion | null {
  if (buffer) {
    try {
      const borshSchema = borsh.struct([
        borsh.u64('id'),
        borsh.publicKey('proposal_key'),
        borsh.publicKey('pre_assert_key'),
        borsh.publicKey('owner'),
        borsh.bool('answer'),
        borsh.u64('assert_amount'),
        borsh.i64('assert_at'),
      ]);
      const { id, proposal_key, pre_assert_key, owner, answer, assert_amount, assert_at } = borshSchema.decode(buffer);
      return { id, proposal_key, pre_assert_key, owner, answer, assert_amount, assert_at };
    } catch (error) {
      console.error('Deserialization error:', error);
      return null;
    }
  }
  return null;
}