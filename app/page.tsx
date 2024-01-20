"use client"
import { useState, useCallback, useEffect, useRef } from 'react'

export default function Home() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAlowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVXWZqwertyuioplkjhgfdsazxcvbnm"
    if (numAllowed) str += "123456789"
    if (charAlowed) str += "!@#$%^&*"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)
  }, [length, numAllowed, charAlowed, setPassword])
  const copyPasswordToClickpboard = useCallback(() => {
   
    
    navigator.clipboard.writeText(Password)
   },
    [Password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAlowed, passwordGenerator]
  )


  return (

    <div className='w-full  max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      PasswordGenerator
      <div className='flex'>
        <input
          type="text"
          value={Password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={ copyPasswordToClickpboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrinkbg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'  >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>

        <div>
          <input
            type="range"
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(parseInt(e.target.value)) }}
          />
          <label htmlFor="">length: {length} </label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id='numberInput'
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor='numberInput'>Number</label>
          <input
            type="checkbox"
            defaultChecked={charAlowed}
            id='charInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor='charInput'>Character</label>

        </div>

      </div>

    </div>

  )
}
