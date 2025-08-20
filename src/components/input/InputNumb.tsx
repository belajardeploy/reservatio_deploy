import AddSubtButton from "../button/AddSubtButton";
interface InputNumbProps {
  setNumb: (x: number) => void,
  max?: number,
  min?: number,
  number: number,
}
const InputNumb = ({ setNumb, max = 6, min = 1, number }: InputNumbProps) => {
  function addNumb() {
    if (number < max) {
      setNumb(number + 1)
    }
  }

  function subNumb() {
    if (number > min) {
      setNumb(number - 1)
    }
  }

  return (
    <div className="border-2 border-neutral-4 rounded-md flex">
      <AddSubtButton className="border-r-[1px] " onClick={subNumb}>-</AddSubtButton>
      <p className="mx-auto my-auto">{number}</p>
      <AddSubtButton className="border-l-[1px] " onClick={addNumb}>+</AddSubtButton>
    </div>
  )
}

export default InputNumb;