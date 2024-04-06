import { useState } from 'react';
import { Button, Input } from '@/components/base'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getProposePDA, getAssertPDA, getChallengeAssertPDA, SolProtocol, programID } from '@/utils/anchor'
import { useSolanaProvider } from '@/hooks/solanaProvider';
import { Program } from '@coral-xyz/anchor';
import idl from "@/utils/idl.json";
import { BN } from '@coral-xyz/anchor';
import { SystemProgram } from '@solana/web3.js';



const TestPage = () => {
  const { publicKey, connected, sendTransaction } = useWallet();
  const provider = useSolanaProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [proposalId, setProposalId] = useState<number>(0);
  const [proposalName, setProposalName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [assertId, setAssertId] = useState<number>(0);
  const [assertProposalId, setAssertProposalId] = useState<number>(0);
  const [assertValue, setAssertValue] = useState<boolean>(false);
  const [challengeId, setChallengeId] = useState<number>(0);


  const onMoveFunds = async (type: "propose" | "assert" | "challengeAssert") => {
    if (!provider || !publicKey || !sendTransaction) return;

    const program = new Program<SolProtocol>(idl as any, programID, provider);

    setIsLoading(true);

    try {

      let signature: string | undefined;

      if (type === "propose") {
        const proposePDA = getProposePDA({ publicKey, proposalId });

        signature = await program.methods.propose(new BN(proposalId), proposalName, new BN(amount))
          .accounts({
            authority: publicKey,
            proposalAccount: proposePDA,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        console.log("propose Transaction: ", signature);
        setProposalId(0);
        setProposalName("");
        setAmount("");
      }

      if (type === "assert") {
        const assertProposePDA = getProposePDA({ publicKey, proposalId: assertProposalId });
        const assertPDA = getAssertPDA({ publicKey, proposalId: assertProposalId, assertId });

        signature = await program.methods.assert(new BN(assertId), assertValue, new BN(assertProposalId))
          .accounts({
            authority: publicKey,
            proposalAccount: assertProposePDA,
            assertionAccount: assertPDA
          })
          .rpc();
        console.log("assert Transaction: ", signature);
      }

      if (type === "challengeAssert") {
        const proposePDA = getProposePDA({ publicKey, proposalId });
        const assertPDA = getAssertPDA({ publicKey, proposalId: assertProposalId, assertId });
        const ChallengeAssertPDA = getChallengeAssertPDA({ publicKey, proposalId, challengeId });
        signature = await program.methods.challengeAssert(new BN(challengeId), new BN(proposalId), new BN(assertId))
          .accounts({
            authority: publicKey,
            proposalAccount: proposePDA,
            assertionAccount: assertPDA,
            challengeAssertionAccount: ChallengeAssertPDA
          })
          .rpc();
        console.log("challengeAssert Transaction: ", signature);
      }

    } catch (err) {
      console.log("Transaction Error: ", err);
    }
    setIsLoading(false);
  };
  return (
    <div className={"flex h-screen items-center justify-center gap-4"}>
      <div className={"ali mt-6 flex w-80 flex-col gap-4"}>
        <Input
          type={"number"}
          placeholder={"Proposal ID"}
          className={"text-black  placeholder:text-black"}
          value={proposalId}
          onChange={(e) => setProposalId(Number(e.target.value))}
        />
        <Input
          type={"string"}
          placeholder={"Proposal Name"}
          className={"text-black"}
          value={proposalName}
          onChange={(e) => setProposalName(e.target.value)}
        />
        <Input
          type={"string"}
          placeholder={"Amount"}
          className={"text-black "}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button onClick={() => onMoveFunds("propose")}>
          {"propose"}
        </Button>
      </div>
      <div className={"ali mt-6 flex w-80 flex-col gap-4"}>
        <Input
          type={"number"}
          placeholder={"Proposal ID"}
          className={"text-black "}
          value={assertId}
          onChange={(e) => setAssertId(Number(e.target.value))}
        />
        <Input
          type={"number"}
          placeholder={"Assert ID"}
          className={"text-black "}
          value={assertProposalId}
          onChange={(e) => setAssertProposalId(Number(e.target.value))}
        />
        <Input
          type={"boolean"}
          placeholder={"Assert Value"}
          className={"text-black"}
          value={assertValue.toString()}
          onChange={(e) => setAssertValue(Boolean(e.target.value))}
        />
        <Button onClick={() => onMoveFunds("assert")}>
          {"assert"}
        </Button>
      </div>
    </div>
  );
}

export default TestPage;