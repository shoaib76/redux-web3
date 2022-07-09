import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/store'
import { connect , fetchData } from './redux/slices/web3ConnectSlice'
import './App.css';
import * as s from "./styles/globalStyles";
import NftRenderer from "./components/nftRenderer";

function App() {
  //use states
  
  

  const dispatch = useAppDispatch()
  const aa = useAppSelector((state) => state.web3Connect)
 

  

 

  
 
  useEffect(() => {
    console.log("balance function outside if")
    if (aa.contract) {
      console.log("balance function is-side if",aa.accounts)
      dispatch( fetchData())
      
    }
  }, [aa.contract, aa.accounts])

//let dd= aa.allNfts;

  // account switch
 
  return (
    <s.Screen>
      {aa.accounts == "" || aa.allNfts == null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the game</s.TextTitle>
          <s.SpacerSmall />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            CONNECT
          </button>
          <s.SpacerXSmall />
          {aa.web3LoadingErrorMessage !== "" ? (
            <s.TextDescription>{aa.web3LoadingErrorMessage}</s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container ai={"center"} style={{ padding: "24px" }}>
          <s.TextTitle>Welcome to the game</s.TextTitle>
          <s.SpacerSmall />
          
          <s.SpacerMedium />
          <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }}>
            {aa.allNfts.map((item, index) => {
              return (
                <s.Container key={index} style={{ padding: "15px" }}>
                  <NftRenderer nft={item} />
                  <s.SpacerXSmall />
                  <s.Container>
                    <s.TextDescription>ID: {item.id}</s.TextDescription>
                    <s.TextDescription>DNA: {item.dna}</s.TextDescription>
                    <s.TextDescription>LEVEL: {item.level}</s.TextDescription>
                    <s.TextDescription>NAME: {item.name}</s.TextDescription>
                    <s.TextDescription>RARITY: {item.rarity}</s.TextDescription>
                    <s.SpacerXSmall />
                    
                  </s.Container>
                </s.Container>
              );
            })}
          </s.Container>
        </s.Container>
      )}
    </s.Screen>
  );
}

export default App;
