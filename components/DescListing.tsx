export default function DescListing(props: any) {
  return (
    <div>
      <div className="grid place-items-center pb-10">
        <h5 className="text-left">Description</h5>
        <p className="text-left text-slate-400 font-light">
          {props.description}
        </p>
      </div>
      <div className="grid place-items-center pb-10">
        <h5 className="text-left">Shipping &amp; pickup options</h5>
        <p className="text-left text-slate-400 font-light">
          {props.shipping} from New Windsor, Auckland
        </p>
      </div>
      <div className="grid place-items-center pb-10">
        <h5 className="text-left">Payment options </h5>
        <p className="text-left text-slate-400 font-light">
          {props.payment}
        </p>{" "}
      </div>
    </div>
  );
}
