import { useState } from "react";
import Layout from "@/componets/Layout";

export default function Files() {
  const useString = () => {
    const [myString, setMyString] = useState("");
    const clear = () => setMyString("");
    return { myString, setMyString, clear };
  };
  const [myFile, setMyFile] = useState<File | null>(null);
  const message = useString();
  const fileName = useString();

  const handleUploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!myFile) return message.setMyString("No file selected");
    const formData = new FormData();
    formData.append("avatar", myFile);
    formData.append("fileName", fileName.myString);
    console.log(formData);
    //const config = { headers: { "content-type": "multipart/form-data" } }
    /*
    axios
      .post("api/files", formData)
      .then((_res) => message.setMyString('done'))
      .catch((err) => message.setMyString(err.message));
      */
    try {
      const response = await fetch("api/files", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        message.setMyString("done");
      } else {
        message.setMyString("Error while uploading");
      }
    } catch (err) {
      console.log(err);
      message.setMyString("Server error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setMyFile(file);
  };

  return (
    <Layout>
      <header>
        <h1>Trying upload files</h1>
      </header>
      <main style={{ margin: "auto", padding: "20px", display: "block" }}>
        <form onSubmit={handleUploadFile}>
          <label htmlFor="avatar">Select a file</label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/png"
            onChange={handleChange}
          />
          <label htmlFor="fileName">Name</label>
          <input
            type="text"
            name="fileName"
            id="fileName"
            onChange={({ target }) => fileName.setMyString(target.value)}
          />
          <input type="submit" value="Save" />
        </form>
        {message.myString !== "" && <h3>{message.myString}</h3>}
      </main>
    </Layout>
  );
}
