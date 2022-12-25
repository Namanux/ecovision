import SingleListing from "./SingleListing";
import DescListing from "./DescListing";
import QnA from "./QnA";
import MeetSeller from "./MeetSeller";

export default function ViewListing(props : any) {
  return (
    <div className="flex-wrap flex-column items-center justify-center space-x-20 py-10">
      <SingleListing title={props.title}
        condition={props.condition}
        price={props.price} />
      <DescListing />

      <hr />
      <QnA />
      <MeetSeller />
    </div>
  );
}
