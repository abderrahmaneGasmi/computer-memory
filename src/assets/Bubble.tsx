import React from "react";
import { MotionStyle, motion } from "framer-motion";

export default function Bubble({ styleAdded }: { styleAdded: MotionStyle }) {
  return (
    <motion.div
      style={{
        ...styleAdded,
        backgroundImage: ` linear-gradient(  45deg,
  hsl(305deg 71% 90%) 0%,
  hsl(324deg 100% 89%) 10%,
  hsl(354deg 100% 87%) 20%,
  hsl(26deg 100% 78%) 30%,
  hsl(44deg 100% 66%) 40%,
  hsl(55deg 100% 50%) 50%,
  hsl(53deg 100% 67%) 60%,
  hsl(53deg 100% 76%) 70%,
  hsl(52deg 100% 84%) 80%,
  hsl(50deg 100% 92%) 90%,
  hsl(40deg 60% 99%) 100%
)`,

        backgroundColor: "#e6ffa9",
        filter: "blur(80px)",
        width: "170px",
        height: "170px",
        borderRadius: "50%",
        position: "absolute",
      }}
    ></motion.div>
  );
}
