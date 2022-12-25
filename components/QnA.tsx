import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function QnA() {
  const [question, setQuestion] = useState('');
  const [id, setId] = useState<any>('');
  const [list, setList] = useState<any>([]);

  const getAllListings = async () => {
    const rawResponse = await fetch(`https://ecovision-backend.vercel.app/api/listings/${id}/comments`)
    const response = await rawResponse.json()

    setList(response.data)
  }

  const handleQuestionSubmit = async () => {      
    await axios.post(`/api/comments/store`, {
      listing: id, 
      question: question
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.data.success){
        getAllListings()

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
    .catch(err => console.log(err))
  }

  useEffect(() => {
    const location = new URL(window.location.href)
    setId(location.searchParams.get('id'))

    getAllListings()
  })

  return (
    <div>
      <div className="grid place-items-start pt-10">
        <h5 className="text-left pb-10">Questions & Answers</h5>
        <p className="mr-96 text-slate-400 font-light">Penny</p>{" "}
        <input
          type="text"
          id="disabled-input"
          aria-label="disabled input"
          className="mr-96 mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value="Hi there, is this authentic? Thanks!"
          readOnly
        ></input>
      </div>

      {/* {list.map((item: any) => {
        return (
          <div className="grid place-items-end text-right">
            <p className="text-right text-slate-400 font-light">Unknown</p>
            <input
              type="text"
              id="disabled-input"
              aria-label="disabled input"
              className="ml-96 mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={item.question}
              readOnly
            />
          </div>
        ) */}

      <div className="mb-3 pt-8">
        <input
          type="text"
          placeholder="Ask a question or write a comment"
          onChange={(e) => setQuestion(e.target.value)}
          className="px-4 py-8 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-base border border-slate-300 w-full"
        />
        <div className="flex pt-8 items-center justify-start">
          <button className="px-20 py-4 text-white bg-primary rounded-lg shadow font-semibold"
            onClick={handleQuestionSubmit}>Ask a question</button>
        </div>
      </div>
    </div>
  )
}