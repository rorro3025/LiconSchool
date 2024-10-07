import { fileController } from "@/controllers/files";
import { dynamoDBDocumentClient } from "@/config/aws";
import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import multer from "multer";
//import {fileTypeFromFile} from 'file-type'

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const saveInformation = async (fileName: string) => {
  const putParams: PutCommandInput = {
    TableName: "noUsers",
    Item: {
      username: "sandrabb",
      emails: "sandrabb@mail.com",
      avatar: fileName,
    },
  };
  try {
    await dynamoDBDocumentClient.send(new PutCommand(putParams));
    console.log("saved");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const typesInformation = {
  png: "image/png",
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg",
  pdf: "application/pdf",
  txt: "text/plain",
  doc: "application/msword",
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    upload.single("avatar")(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json("algo fallo");
      }
      if (!req.body.fileName)
        return res
          .status(400)
          .json({ message: "No se envio el nombre del archivo" });
      if (!req.file)
        return res.status(400).json({ message: "No se envio el archivo" });
      const fileName:string = req.body.fileName ;
      const file = req.file;
      console.log("formTitle: ", fileName);
      const ext = file.originalname.split(".").pop();
      console.log(ext)
      console.log(file.mimetype)
      //const result = await fileController.saveFile(file.buffer,file.mimetype,ext, file.size)
      const result = await fileController.saveFileV2(file)
      if(!result.success) return res.status(500).json({message:result.message})
      return res.status(200).json({ message: "Uploaded" });

      //const type = await fileTypeFromFile(file.path)
      //if(!type) return res.status(400).json({message:'No se pudo obtener el tipo de archivo'})

      /*
            if(result.success){
            const savedDB = await saveInformation('https://liconapp-public-assets.s3.amazonaws.com/singature1.png')
            if(savedDB) return res.status(200).json({message:'Uploaded'})
            }
            return res.status(500).json({message:'Someting happened'})
            */
    });
    /*
        const file = req.file
        if(result.success) return res.status(200).json({name:'John Doe'})
        return res.status(500).json(result.message)
         */
      //return res.status(204).json();
  }
}
