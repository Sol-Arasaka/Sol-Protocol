import { Button } from '@/components/base'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getProposePDA, getAssertPDA, getChallengeAssertPDA } from '@/utils/anchor'


const TestPage = () => {
  const { publicKey, connected, sendTransaction } = useWallet();


  return (
    <>
      <div className={"mt-6 flex flex-col gap-4"}>
        <Button
          onClick={() => {
            try {
              const proposePDA = getProposePDA(publicKey!);
              console.log(proposePDA);
            } catch (err) {
              console.log('getProposePDA filed', err);
            }
          }}
        >
          {"getProposePDA"}
        </Button>
        <Button
          onClick={() => {
            try {
              const proposePDA = getAssertPDA(publicKey!);
              console.log(proposePDA);
            }
            catch (err) {
              console.log('getProposePDA filed', err);
            }
          }}
        >
          {"getAssertPDA"}
        </Button>
        <Button
          onClick={() => {
            try {
              const proposePDA = getChallengeAssertPDA(publicKey!);
              console.log(proposePDA);
            } catch (err) {
              console.log('getChallengeAssertPDA filed', err);
            }
          }}
        >
          {"getChallengeAssertPDA"}
        </Button>
      </div>
    </>
  )
}

export default TestPage;