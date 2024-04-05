import { useState } from 'react';
import { Button } from '@/components/base'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getProposePDA, getAssertPDA, getChallengeAssertPDA, SolProtocol, programID } from '@/utils/anchor'
import { useSolanaProvider } from '@/hooks/solanaProvider';
import { Program } from '@coral-xyz/anchor';
import idl from "@/utils/idl.json";
import { BN } from '@coral-xyz/anchor';



const TestPage = () => {
  const { publicKey, connected, sendTransaction } = useWallet();
  const provider = useSolanaProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [proposalId, setProposalId] = useState<number>(0);
  const [proposalName, setProposalName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [assertId, setAssertId] = useState<number>(0);
  const [assertValue, setAssertValue] = useState<boolean>(false);
  const [challengeId, setChallengeId] = useState<number>(0);


  const onMoveFunds = async (type: "propose" | "assert" | "challengeAssert") => {
    if (!provider || !publicKey || !sendTransaction) return;

    // The program variable is an instance of the Program class.
    // It takes our program's idl and the programId as arguments.
    // Using the idl it generates a set of methods that can be called on the program.
    // The programID is the public key of the program. It is used to interact with the program on-chain.
    const program = new Program<SolProtocol>(idl as any, programID, provider);

    setIsLoading(true);

    try {
      const proposalAccount = getProposePDA({ publicKey, proposalId });
      const assertionAccount = getAssertPDA({ publicKey, proposalId, assertId });
      const challengeAccount = getChallengeAssertPDA({ publicKey, proposalId, challengeId });

      // The sig variable is the transaction signature.
      // It is used to track the transaction on-chain.
      let signature: string | undefined;

      if (type === "propose") {
        signature = await program.methods.propose(new BN(proposalId), proposalName, new BN(amount))
          .accounts({
            authority: publicKey,
            proposalAccount,
            systemProgram: publicKey,
          })
          .rpc(); // The rpc method sends the transaction to the cluster and returns the transaction signature.
      }
      console.log("Transaction Signature: ", signature);

      if (type === "assert") {
        signature = await program.methods.assert(new BN(assertId), assertValue, new BN(proposalId))
          .accounts({
            authority: publicKey,
            proposalAccount,
            assertionAccount,
          })
          .rpc();
      }

    } catch (err) {
      console.log("Transaction Error: ", err);
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className={"mt-6 flex flex-col gap-4"}>
        <Button
          onClick={() => onMoveFunds("propose")}
        >
          {"propose"}
        </Button>
      </div>
    </>
  )
}

export default TestPage;