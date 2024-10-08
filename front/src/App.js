import { FileUploader } from "react-drag-drop-files";
import { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';

function App() {
  const txtName = useRef()
  const txtDescription = useRef()
  // const flImage = useRef()
  const [files, setFile] = useState([]);
  const handleChange = (file) => {
    setFile(file);
  };
  const [products, setProducts] = useState([])
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/app/index/`)
      .then(result => {
        setProducts(result.data.products)
      })
    setUpdate(false)
  }, [update])
  return (
    <>
      Name:
      <input type="text" ref={txtName} />
      <br />
      Description:
      <input type="text" ref={txtDescription} />
      <br />
      {/* <input type="file" multiple ref={flImage} /> */}
      <FileUploader handleChange={handleChange} name="file" type="file" multiple />
      <br />
      <input type="button" value="save" onClick={() => {
        // let files = flImage.current.files
        let formData = new FormData()
        for (let file of files){
          formData.append("images", file)
        }  

        formData.append("name", txtName.current.value)
        formData.append("description", txtDescription.current.value)
        axios.post("http://localhost:8000/app/save/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          setUpdate(true)
        }).catch((res) => {

        })
      }} />
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr>
              <td>{parseInt(++index)}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.images.map((image)=>(
                <img src={image} width="50"/>
              ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
