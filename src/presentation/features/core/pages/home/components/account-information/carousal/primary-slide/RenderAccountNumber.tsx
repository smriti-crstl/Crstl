// import { ReactComponent as Dot } from "globals/assets/svgs/Dot.svg";
import { ReactElement } from "react";

type Props = {
  accountNumber?: string;
  color?: string;
  countOfRampCards?: number;
};

// const getAccStringChunks = (str: string): string[] => {
//   const size = 4;
//   const numChunks = Math.ceil(str.length / size);
//   const chunks = new Array(numChunks);
//   for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
//     chunks[i] = str.substr(o, size);
//   }
//   return chunks;
// };

export const RenderAccountNumber = ({
  accountNumber,
  countOfRampCards,
}: Props): ReactElement => {
  if (!accountNumber && !countOfRampCards) {
    return <div />;
  }
  if (countOfRampCards && !accountNumber) {
    return <span>Number of cards connected: {countOfRampCards}</span>;
  } else {
    return <span>Account ending in {accountNumber}</span>;
  }

  // const chunks = getAccStringChunks(accountNumber);

  // return (
  //   <div>
  //     Account ending in &nbsp;
  //     {chunks.map((item, index) => {
  //       if (index === chunks.length - 1) {
  //         return <span key={item + index}>{item}</span>;
  //       }
  //       return (
  //         <span key={item + index} style={{ marginRight: "8px" }}>
  //           {item.split("").map((_char, index) => (
  //             <Dot key={index} style={{ fill: color, marginRight: "8px" }} />
  //           ))}
  //         </span>
  //       );
  //     })}
  //   </div>
  // );
};
