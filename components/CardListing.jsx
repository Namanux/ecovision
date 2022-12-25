import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CardListing(props) {
    const handleDelete = async () => {
        await axios.delete(`https://ecovision-backend.vercel.app/api/listings/${props.id}`)
            .then(res => {
                props.setDelete(true)
                if(res.data.success){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Success',
                        text: res.data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
    }
    
    return (
        <div className="flex justify-center px-5 rounded-lg card card-side bg-base-100 mb-6">
            <figure>
                <img src={props.photo} 
                    alt="image" 
                    width={221} 
                    height={216} />
            </figure>
            <div className="card-body border flex flex-row items-center">

                <div className='full-w'>
                    <h3 className="card-title mb-2 text-lg">{props.title}</h3>
                    <p className='mb-4 text-gray-500'>{props.description}</p>
                    <h1 className="font-bold text-xl">${props.price}</h1>
                </div>

                <div className="card-actions flex justify-end w-full">
                    <div className='flex space-x-4'>
                        <Link href={`/new-listing?id=${props.id}`} 
                            className='w-full bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg outline-none hover:bg-secondary hover:shadow-lg focus:bg-primary ease-linear transition-all duration-150'>Edit</Link> 
                        <button type="button"
                            onClick={handleDelete}
                            className='w-full bg-white border-2 border-gray-300 px-6 py-2.5 rounded-lg hover:shadow-lg ease-linear transition-all duration-150'>Delete</button>
                    </div>
                </div>
            
            </div>
        </div>  
    )
}