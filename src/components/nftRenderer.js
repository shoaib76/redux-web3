import React from "react";
// cards
import { parts } from "../parts/parts";
import _r1 from "../assets/images/rarity/_rarity_1.png";
import _r2 from "../assets/images/rarity/_rarity_2.png";
import _r3 from "../assets/images/rarity/_rarity_3.png";

const NftRenderer = ({ nft = null, size = 200, style }) => {
  if (!nft) {
    return null;
  }
  let rarity = _r1;

  if (nft.rarity >= 80) {
    rarity = _r2;
  }
  if (nft.rarity >= 95) {
    rarity = _r3;
  }

  let dnaStr = String(nft.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  let nftDeatils = {
    bg: dnaStr.substring(0, 2) % 5,
    face: dnaStr.substring(2, 4) % 5,
    eyes: dnaStr.substring(4, 6) % 5,
    hair: dnaStr.substring(6, 8) % 5,
    glasses: dnaStr.substring(8, 10) % 10,
    mask: dnaStr.substring(10, 14) % 10,
   // addonMouth3: dnaStr.substring(12, 14) % 5,
    name: nft.name,
  };

  const nftStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  
  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
        background: "blue",
        position: "relative",
        ...style,
      }}
    >
      <img alt={"bg"} src={parts.bg[nftDeatils.bg]} style={nftStyle} />
      <img alt={"face"} src={parts.face[0]} style={nftStyle} />
      <img alt={"eyes"} src={parts.eyes[nftDeatils.eyes]} style={nftStyle} />
      <img alt={"hair"} src={parts.hair[nftDeatils.hair]} style={nftStyle} />
      <img
        alt={"glasses"}
        src={parts.glasses[nftDeatils.glasses]}
        style={nftStyle}
      />
      <img
        alt={"mask"}
        src={parts.mask[nftDeatils.mask]}
        style={nftStyle}
      />
      
      
      <img alt={"rarity"} src={rarity} style={nftStyle} />
    </div>
  );
};

export default NftRenderer;
