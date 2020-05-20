import React from 'react'
import { ethers, Wallet } from "ethers";
import { Card, Button } from 'antd';
const axios = require('axios');

export default function SmartContractWallet(props) {

  const voteButton = (emoji)=>{
    return (
      <Button onClick={()=>{
        castVote(emoji,translateEmoji(emoji))
      }}>{emoji}</Button>
    )
  }

  const castVote = async (emoji,emojiName)=>{
    let timestamp = Date.now()
    console.log("timestamp",timestamp)
    console.log("props.injectedProvider",props.injectedProvider)
    let signer = props.injectedProvider.getSigner()
    console.log("signer",signer)
    //let hex = ethers.utils.hexlify("emojivote"+emoji+timestamp)
    //console.log("hex",hex)
    //web3.utils.stringToHex(string)
    //let hash = ethers.utils.keccak256()
    //console.log("hash",hash)
    console.log("props.address",props.address)
    let message = "emojivote"+emojiName+timestamp
    console.log("message",message)
    let result = await signer.signMessage(message)
    console.log("result",result)


    let recovered = await ethers.utils.verifyMessage ( message , result )

    console.log("recovered",recovered)



    axios.get('https://hooks.zapier.com/hooks/catch/7580698/oiml1yj?address='+props.address+'&vote='+emoji+'&timestamp='+timestamp+'&signature='+result)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
      console.log("finally")
    });
  }

  return (
    <div>
      <Card
        title={(
          <div>
            🗳  Pick Your Favorite Emoji:
          </div>
        )}
        size="large"
        style={{ width: 550, marginTop: 25 }}
        >
          {voteButton("🐮",)}
          {voteButton("🦁")}
          {voteButton("🐭")}
          {voteButton("🦊")}
          {voteButton("🐶")}
          {voteButton("🐰")}
          {voteButton("🐸")}
      </Card>
    </div>
  );

}



const translateEmoji = (emoji)=>{
  if(emoji==="🦁"){
    return "LION"
  } else if(emoji==="🐮"){
    return "COW"
  } else if(emoji==="🐭"){
    return "MOUSE"
  } else if(emoji==="🦊"){
    return "FOX"
  } else if(emoji==="🐶"){
    return "DOG"
  } else if(emoji==="🐰"){
    return "RABBIT"
  } else if(emoji==="🐸"){
    return "FROG"
  }
}