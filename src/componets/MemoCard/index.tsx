import { useState } from "react"

interface Props {
  img: string,
}

export default function MemoCard({ img }: Props) {
  const [isFlipped, setIsFlipped] = useState<Boolean>(false)

  const flipStyle = { width: 150, height: 150, border: "1px solid white" }
  const noFlipStyle = { width: 150, height: 150, border: "1px solid white", backgroundColor: 'red' }
  return (
    <div style={isFlipped ? noFlipStyle : flipStyle} onClick={() => setIsFlipped(!isFlipped)}>
      <img src={img} height="100px" width={"100px"} alt='none' style={isFlipped ? { display: 'none' } : { margin: "25px" }} />
    </div>
  )
}
