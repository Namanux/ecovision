export default function SingleListing(props : any) {
  return (
    <div className="flex flex-row items-center justify-between px-20 mb-6">
      <div className="flex items-center justify-center">
        <img src={props.photo} alt="spectacles" width={687} height={507} />
      </div>

      <div className="flex flex-col items-center justify-center space-y-8">

        <div className="flex flex-col text-left justify-left">
          <h1 className="my-2 text-5xl font-bold text-black md:text-3xl w-80">{props.title}</h1>
          <p className="text-slate-400 font-light">Condition: {props.condition.split('-').join(' ').toUpperCase()}</p>
        </div>

        <h1 className="font-bold text-3xl text-center">${props.price}</h1>
        <button className="px-20 py-4 text-white bg-primary rounded-lg shadow font-semibold">Buy Now</button>
      </div>
    </div>
  );
}
