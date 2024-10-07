import QRCode from "qrcode.react";

interface Props {
  message: string
}

export default function QR2({ message }: Props) {
  return <QRCode value={message} fgColor={'#CE0E2D'} size={50} />
}


