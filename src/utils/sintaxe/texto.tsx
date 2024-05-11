
interface sintaxeParams {
  text: string;
}

const aprimorando_sintaxe = ({ text }: sintaxeParams) => {
  const textComNegrito = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

  const textComCodigo = textComNegrito.replace(/```([^`]*)```/g, '<pre><code>$1</code></pre>');

  return (
    <div dangerouslySetInnerHTML={{ __html: textComCodigo }} ></div>
  );
}

export default aprimorando_sintaxe