import styles from './CreatePost.module.css'

import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthValue} from '../../context/AuthContext';
import {useInsertDocument} from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const {insertDocument, response} = useInsertDocument("posts");
  const {user} = useAuthValue();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL")
    }
    
    //criar arry de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos");
    }

    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    //redirect to home page
    navigate("/");
  };
  
  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Compartilhe seus momentos</p>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="title" 
            required
            placeholder="Escreva um título"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <input
            type="text"
            name="image" 
            required
            placeholder="Insira a URL de uma imagem"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <textarea 
            name="body" 
            required
            placeholder="Escreva o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          >
          </textarea>
        </label>

        <label>
          <input
            type="text"
            name="tags" 
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Postar</button>}
        {response.loading && <button className="btn" disable>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;