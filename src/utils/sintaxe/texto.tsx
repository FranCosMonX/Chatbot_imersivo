
interface sintaxeParams {
  text: string;
}

const aprimorando_sintaxe = ({ text }: sintaxeParams) => {
  const textComNegrito = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
  return (
    <div dangerouslySetInnerHTML={{ __html: textComNegrito }} />
  )
}

export default aprimorando_sintaxe