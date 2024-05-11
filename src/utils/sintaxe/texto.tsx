
interface sintaxeParams {
  text: string;
}

const aprimorando_sintaxe = ({ text }: sintaxeParams) => {
  const textComNegrito = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

  const textComLista = textComNegrito.replace(/[*|-] (.*?)(\n|$)/g, '<ul><li>$1</li></ul>');

  const textComCodigo = textComLista.replace(/```([^`]*)```/g, '<pre><code>$1</code></pre>');

  return (
    <div dangerouslySetInnerHTML={{ __html: textComCodigo }} />
  );
}

export default aprimorando_sintaxe