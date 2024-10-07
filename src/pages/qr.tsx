import { useState,useEffect } from "react";
import QRCode from "react-qr-code";
import QR2 from "@/componets/QR2";
import { getStatus } from "@/utils";
import MemoCard from "@/componets/MemoCard";
import img1 from "@/images/Bueno 01.png";
import img2 from "@/images/OIP.jpg";
import Layout from "@/componets/Layout";

const imageArray = [img1, img2];

export default function QR() {
  const [qrText, setQrText] = useState<string>("none");
  const [isInactive,setIsInactive] = useState<boolean>(true)
  const handleDownload = () => {
    const svg = document.getElementById("QRImage");
    // @ts-ignore
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QR";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  const handleSave = () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const dataURL = canvas.toDataURL("image/png");
    const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, "");
    console.log(Buffer.from(base64Data, "base64"));
  };

  const handleStatus = async () => {
    const sts = await getStatus(
      "https://liconapp-images.s3.amazonaws.com/transferenciasEspeciales/68532"
    );
    console.log(sts);
  };

  useEffect(()=>{
    let inactivityTimeOut

    const resetInactivityTimeout = () =>{
      inactivityTimeOut = setTimeout(()=>setIsInactive(true),5000)      
    }


  },[])
  return (
    <Layout>
      <h1>Hello this is a PWA</h1>
      <h2>text: </h2>{" "}
      <h2>isInactive: {isInactive? 'Inactivo': 'activo'}</h2>
      <input type={"text"} onChange={({ target }) => setQrText(target.value)} />
      <div style={{ background: "Pink", padding: "20px" }}>
        <QRCode id="QRImage" value={qrText} fgColor={"#CE0E2D"} />
        <button onClick={handleDownload}>Download</button>
      </div>
      <div style={{ background: "coral", padding: "20px" }}>
        <QR2 message={qrText} />
        <button onClick={handleSave}>Otro boton</button>
        <button onClick={handleStatus}>Otro boton 2</button>
      </div>
      <div style={{ padding: "30px", display: "flex" }}>
        {imageArray.map((i, index) => (
          <MemoCard img={i.src} key={index} />
        ))}
      </div>
    </Layout>
  );
}
