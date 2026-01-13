"use client"

import { useState, useEffect } from 'react'

export default function BackDoor() {
  const [data, setData] = useState<null | string>(null)
  const [add, setAdd] = useState<number>(0)
  const [rm, setRm] = useState<number>(0)
  const [init, setInit] = useState<number>(0)
  const handleInit = () => {
    const arData = []
    for (let i = 1; i <= init; ++i)
      arData.push(i)
    setData(JSON.stringify(arData))
  }
  const handleAdd = () => {
    if (data === null) {
      alert('Data is null!')
      return
    }
    const arData = JSON.parse(data)
    const addElement = (v: number) => {
      let l = 0
      let r = arData.length
      let m = Math.floor((l + r) / 2)
      while (l < r) {
        if (arData[m] < v)
          l = m + 1
        else
          r = m
        m = Math.floor((l + r) / 2)
      }
      arData.splice(m, 0, v)
    }
    addElement(add)
    setData(JSON.stringify(arData))
  }
  const handleRm = () => {
    if (data === null) {
      alert('Data is null!')
      return
    }
    const arData = JSON.parse(data)
    const remove_all = (v: number) => {
      const idL = arData.indexOf(v)
      const idR = arData.lastIndexOf(v)
      arData.splice(idL, idR - idL + 1)
    }
    remove_all(rm)
    setData(JSON.stringify(arData))
  }
  const handleSave = () => {
    if (localStorage.getItem('log') === null)
      localStorage.setItem('log', JSON.stringify([]))
    if (data === null) {
      localStorage.setItem('parts', JSON.stringify([]))
      return
    }
    localStorage.setItem('parts', data)
    alert('抽獎箱已儲存')
  }

  const handleCleanAllWinners = () => {
    for(let i = 0; i < 5; ++i) {
      const Id = `winner${i + 1}`
      if(localStorage.getItem(Id) === null) continue
      localStorage.setItem(Id, 'null')
    }
    alert('所有中獎者已清除')
  }

  useEffect(() => {
    window.addEventListener("storage", (ev) => {
      if(ev.key === 'parts') {
        setData(ev.newValue)
      }
    })
    setData(localStorage.getItem('parts'))
  }, [])

  return (
    <>
      <div className='m-3'>
        <div className='my-3'>
          <span className='mx-2 inline-block max-w-full border-2 border-slate-500 p-1 overflow-auto'>當前抽獎箱: {data === null ? '[]' : data}</span>
        </div>
        <div className='my-3'>
          <input type='number' className='mx-2 border-2 border-slate-500 p-1' onChange={(e) => setInit(Number(e.target.value))} />
          <button className='border-2 border-slate-500 p-1' onClick={handleInit}>初始化抽獎箱</button>
        </div>
        <div className='my-3'>
          <input type='number' className='mx-2 border-2 border-slate-500 p-1' onChange={(e) => setAdd(Number(e.target.value))} />
          <button className='border-2 border-slate-500 p-1' onClick={handleAdd}>新增號碼</button>
        </div>
        <div className='my-3'>
          <input type='number' className='mx-2 border-2 border-slate-500 p-1' onChange={(e) => setRm(Number(e.target.value))} />
          <button className='border-2 border-slate-500 p-1' onClick={handleRm}>刪除號碼</button>
        </div>
        <div className='my-3'>
          <button className='mx-2 border-2 border-slate-500 p-1' onClick={handleSave}>儲存抽獎箱</button>
          <button className='mx-2 border-2 border-slate-500 p-1' onClick={handleCleanAllWinners}>清除所有中獎者</button>
        </div>
      </div>
    </>
  )
}
