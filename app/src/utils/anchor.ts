import { PublicKey } from "@solana/web3.js";

export const programID = new PublicKey(
  "3HuN3uYw1h33gUyJwoy1vRaNLEijd782ceLQPgSCk9b4"
); // this is for test

export const getProposePDA = (publicKey: PublicKey) => {
  const [vaultPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("propose"), publicKey.toBuffer()],
    programID
  );
  return vaultPDA;
};

export const getAssertPDA = (publicKey: PublicKey) => {
  const [vaultPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("assert"), publicKey.toBuffer()],
    programID
  );
  return vaultPDA;
};

export const getChallengeAssertPDA = (publicKey: PublicKey) => {
  const [vaultPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("challengeAssert"), publicKey.toBuffer()],
    programID
  );
  return vaultPDA;
};

export type SolProtocol = {
  version: "0.1.0";
  name: "sol_protocol";
  instructions: [
    {
      name: "propose";
      accounts: [
        { name: "authority"; isMut: true; isSigner: true },
        { name: "proposalAccount"; isMut: true; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [
        { name: "id"; type: "u64" },
        { name: "proposalName"; type: "string" },
        { name: "rewardAmount"; type: "u64" }
      ];
    },
    {
      name: "assert";
      accounts: [
        { name: "authority"; isMut: true; isSigner: true },
        { name: "proposalAccount"; isMut: true; isSigner: false },
        { name: "assertionAccount"; isMut: true; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [
        { name: "id"; type: "u64" },
        { name: "answer"; type: "bool" },
        { name: "proposalId"; type: "u64" }
      ];
    },
    {
      name: "challengeAssert";
      accounts: [
        { name: "authority"; isMut: true; isSigner: true },
        { name: "proposalAccount"; isMut: true; isSigner: false },
        { name: "assertionAccount"; isMut: true; isSigner: false },
        { name: "challengeAssertionAccount"; isMut: true; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [
        { name: "id"; type: "u64" },
        { name: "proposalId"; type: "u64" },
        { name: "assertId"; type: "u64" }
      ];
    }
  ];
  accounts: [
    {
      name: "ProposalAccount";
      type: {
        kind: "struct";
        fields: [
          { name: "id"; type: "u64" },
          { name: "owner"; type: "publicKey" },
          { name: "proposalName"; type: "string" },
          { name: "rewardAmount"; type: "u64" },
          { name: "assertAt"; type: "i64" }
        ];
      };
    },
    {
      name: "AssertionAccount";
      type: {
        kind: "struct";
        fields: [
          { name: "id"; type: "u64" },
          { name: "proposalKey"; type: "publicKey" },
          { name: "preAssertKey"; type: "publicKey" },
          { name: "owner"; type: "publicKey" },
          { name: "answer"; type: "bool" },
          { name: "assertAmount"; type: "u64" },
          { name: "assertAt"; type: "i64" }
        ];
      };
    }
  ];
  errors: [
    { code: 6000; name: "AlreadyAsserted"; msg: "Already asserted" },
    { code: 6001; name: "NotYetAsserted" }
  ];
  metadata: { address: "3Y1UEAKRVuRr4qX8KN4UxhbhaACVCyskbDushd2Ud2FY" };
};
