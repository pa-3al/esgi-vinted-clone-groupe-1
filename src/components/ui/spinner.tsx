
type spinnerProps = {
  text: string;
}


export default function Spinner(props : spinnerProps) {
  return (
    <>
      <div
        className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-teal-700 rounded-[999px] mr-4"
        role="status"
        aria-label="loading"
      ></div>
      <span>{props.text}</span>
    </>
  );
}