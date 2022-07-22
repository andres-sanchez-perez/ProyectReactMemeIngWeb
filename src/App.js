import './App.css';
import {
  useEffect,
  useState
} from 'react';
import {Meme} from './components/Meme';


const objectToQueryParam =(obj) => {
  const params = Object.entries(obj).map(([key,value]) => `${key}=${value}`)
  return '?' + params.join('&');
}

function App() {

  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes)))
  }, [])


  if(meme){
    return <div style={{textAlign:"center"}}>
      <img style={{width:500}} src={meme} alt="Some meme"/>
    </div>
  }

  return (

    <div style={{textAlign:"center"}}>
      {template && (
        <>
          <form onSubmit={async e => {
            e.preventDefault();
            const params ={
              template_id: template.id,
              text0:firstText,
              text1:secondText,
              username: 'andresao112',
              password: 'Pipesao199909'
            };
            const response =await fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`);
            const json =await response.json();
            setMeme(json.data.url);
          }}>
            <Meme template={template}/>
            <input placeholder='First text' value={firstText} onChange={e => setFirstText(e.target.value)}/>
            <input placeholder='Second text' value={secondText} onChange={e => setSecondText(e.target.value)}/>
            
            <button type="submit">Create meme</button>
          </form>
        </>
        )}
      {!template && (
        <>
        <h1>Pick a template</h1>
        
        {templates.map(template =>{
          return(
            <Meme 
              template={template}
              onClick ={() =>{
                setTemplate(template);
              }}
            />
          );
        })}
      </>
      )}
    </div>
  );
}

export default App;