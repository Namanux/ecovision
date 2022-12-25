import { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
// import ViewListing from "../components/ViewListing";
import SingleListing from "../components/SingleListing";
import DescListing from "../components/DescListing";
import QnA from "../components/QnA";
import MeetSeller from "../components/MeetSeller";
import Footer from "../components/Layouts/Footer";

type ListingData = {
  photo: string,
  title: string,
  description: string,
  price: string,
}

const viewLisiting = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState("")
  const [condition, setCondition] = useState("")
  const [shipping, setShipping] = useState("")
  const [payment, setPayment] = useState("")
  
  useEffect(() => {
    const location = new URL(window.location.href)
    const id = location.searchParams.get('id')

    if(id){
      fetch(`https://ecovision-backend.vercel.app/api/listings/${id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setPrice(data.price);
          setDescription(data.description);
          setPhoto(data.photo);
          setCondition(data.condition);
          setShipping(data.shipping);
          setPayment(data.payment);
        })
    }
  }, [])
  
  return (
    <Layout>
      <div className="flex-wrap flex-column items-center justify-center space-x-20 py-10">
        <SingleListing 
          photo={photo}
          title={title}
          condition={condition}
          price={price} />

        <div>
          <div className="grid place-items-start mb-10">
            <h5 className="text-left">Description</h5>
            <p className="text-left text-slate-400 font-light">
              {description}
            </p>
          </div>
          <div className="grid place-items-start mb-10">
            <h5 className="text-left">Shipping &amp; pickup options</h5>
            <p className="text-left text-slate-400 font-light">
              {shipping} from New Windsor, Auckland
            </p>
          </div>
          <div className="grid place-items-start mb-10">
            <h5 className="text-left">Payment options </h5>
            <p className="text-left text-slate-400 font-light">
              {payment}
            </p>
          </div>
        </div>

        <hr />
        <QnA />
        <MeetSeller />
      </div>

      <Footer /> 
    </Layout>
  );
};

export default viewLisiting;
