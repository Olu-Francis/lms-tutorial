"use client"

import { executeCode } from '@/app/api/debug/route';
import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from "react";
import toast from "react-hot-toast";
import { useConfettiStore } from "@/hooks/use-confetti-store";

function Output( {editorRef} ) {
  const confetti = useConfettiStore();
  const [codeOutput, setCodeOutput] = useState(null)
  const [codeError, setCodeError] = useState(false)

  const runCode = async ()  => {
    const sourceCode = editorRef.current.getValue();
    if(!sourceCode) return;
    try {
      const {run:result} = await executeCode(sourceCode);
      setCodeOutput(result.output.split("\n"))
      result.stderr ? setCodeError(true) : setCodeError(false)
      if (!result.stderr) {
        toast.success("You successfully ran a code! \nDon't stop now!!")
        confetti.onOpen()
      }else{
        toast.error("You've got an error! Try again!!")
      }
    } catch (error) {
      console.log(error)
      toast.error(`There was a problem with your request. ${error}`)
    }
  }

  return (
    <div className='pl-6 min-w-[40%]'>
        <p className="mb-2 font-medium">Output</p>
        <Button variant={"outline"} color='green' className='mb-4' onClick={runCode}>
          Run Code
        </Button>
        <div className={ codeError ? "min-h-[75vh] max-w-md rounded-lg text-destructive border border-destructive md:min-w-[45vh]" : "min-h-[75vh] max-w-md rounded-lg border md:min-w-[45vh]"}>
          {
              codeOutput ? codeOutput.map(
                (line, i) => <p key={i}>{line}</p>
              ) : "Click 'Run Code' to see your output."
            }
        </div>
    </div>
  )
}

export default Output