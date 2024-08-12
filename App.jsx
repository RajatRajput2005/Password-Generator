import { useState, useCallback, useEffect , useRef } from 'react'

 

function App() {
  const [ln, setln] = useState(8)
  const [noal , setnoal]  = useState(false)
  const [coal , setcoal] = useState(false) 
 const [password , setpassword] = useState("")
//  useref hook
 const passref =useRef(null)
  const passwordGenerator =  useCallback( ()=> {
     let  pass  = "" 
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(noal) str+="0123456789"
     if(coal) str+="!@#$%^&*(){}[]><:"
    for (let i = 1; i <= ln; i++) {
       let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      
    }
     setpassword(pass)
  } , [ ln , noal  , coal , setpassword])

  const copypasstoclipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  } , [password])
     
  useEffect(() => {
    passwordGenerator() 
   } , [ln , noal , coal ,passwordGenerator])

  return (
    <>
      <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  bg-black text-white  text-lg'>
        <h1 className='text-white text-center my-3'> <b> Strong Password Generator</b> </h1>
      
      <div className=' flex shadow rounded-lg overflow-hidden my-8 text-black'>
         <input type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passref}
         />
         <button onClick={copypasstoclipboard}  className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>COPY</button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" 
        min={6} 
        max={60}
        value={ln}
        className='cursor-pointer'
        onChange={(e) => {setln(e.target.value)}}
        ref={passref}
        />
        <label > Length:{ln}</label>
      
      </div>
      <div className='flex items-center gap-x-1'>
         <input type="checkbox" 
         defaultChecked ={noal} 
         id='numberInput'
         onChange={() =>{ setnoal((prev)=>
         !prev);}}
         /> 
         <label htmlFor='numberInput'>Numbers</label>
         </div>
         <div className='flex items-center gap-x-1'>
         <input type="checkbox" 
         defaultChecked ={coal} 
         id='charInput'
         onChange={() => {setcoal((prev)=>
         !prev);}}
         /> 
         <label htmlFor='charInput' >Characters</label>
         </div>
      </div>
      
      </div>
    </>
  )
}

export default App
