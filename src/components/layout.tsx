import type { NextPage } from 'next'
import Link from 'next/link'
import { CogIcon, HomeIcon, PlusIcon } from '@heroicons/react/solid'
import { ChangeEventHandler, useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../cardano/config'
import { NotificationCenter } from './notification'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, Treasury } from '../db'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getTreasuriesPath } from '../route'
import { encodeCardanoData } from '../cardano/multiplatform-lib'

const Toggle: NextPage<{
  isOn: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}> = ({ isOn, onChange }) => {
  return (
    <label className='cursor-pointer'>
      <input className='hidden peer' type='checkbox' checked={isOn} onChange={onChange} />
      <div className='flex border w-12 rounded-full border-gray-500 bg-gray-500 peer-checked:bg-green-500 peer-checked:border-green-500 peer-checked:justify-end'>
        <div className='h-6 w-6 rounded-full bg-white'></div>
      </div>
    </label>
  )
}

const Panel: NextPage<{ className?: string }> = ({ children, className }) => {
  return (
    <div className={'border-t-4 border-sky-700 bg-white rounded shadow overflow-hidden ' + className}>
      {children}
    </div>
  )
}

const CopyButton: NextPage<{
  disabled?: boolean
  className?: string
  getContent: () => string
  ms?: number
}> = ({ children, className, disabled, getContent, ms }) => {
  const [isCopied, setIsCopied] = useState(false)

  const clickHandle = () => {
    navigator.clipboard.writeText(getContent())
    setIsCopied(true)
  }

  useEffect(() => {
    let isMounted = true

    const timer = setTimeout(() => {
      if (isMounted && isCopied) setIsCopied(false)
    }, ms)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [isCopied, ms])

  return (
    <button className={className} disabled={disabled || isCopied} onClick={clickHandle}>
      {isCopied ? 'Copied!' : children}
    </button>
  )
}

const ShareCurrentURLButton: NextPage<{
  className?: string
}> = ({ children, className }) => {
  return (
    <CopyButton className={className} getContent={() => document.location.href} ms={500}>
      {children}
    </CopyButton>
  )
}

const BackButton: NextPage<{
  className?: string
}> = ({ children, className }) => {
  const router = useRouter()
  return <button className={className} onClick={() => router.back()}>{children}</button>;
}

const NavLink: NextPage<{
  className?: string
  href: string
  onPageClassName: string
}> = ({ children, className, href, onPageClassName }) => {
  const [isOnPage, setIsOnPage] = useState(false)
  const parentPaths = href.split('/')

  useEffect(() => {
    let isMounted = true

    const currentPaths = document.location.pathname.split('/')
    const isOnPage = parentPaths.every((name, index) => name === currentPaths[index])

    if (isMounted) setIsOnPage(isOnPage)

    return () => {
      isMounted = false
    }
  }, [parentPaths])

  return (
    <Link href={href}>
      <a className={[className, isOnPage ? onPageClassName : ''].join(' ')}>
        {children}
      </a>
    </Link>
  )
}

const PrimaryBar: NextPage = () => {
  return (
    <aside className='flex flex-col w-20 bg-sky-900 items-center text-white'>
      <Link href='/'>
        <a className='p-4 hover:bg-sky-700'>
          <HomeIcon className='w-12' />
        </a>
      </Link>
      <NavLink
        href='/config'
        onPageClassName='bg-sky-700'
        className='p-4 hover:bg-sky-700'>
        <CogIcon className='w-12' />
      </NavLink>
      <a className='p-4 hover:bg-sky-700' target='_blank' rel='noreferrer' href='https://fogon.aldea-dao.org'>
        <div style={{ height: '48px' }}>
          <Image src='/Telegram-Logo-White.svg' width={48} height={48} alt='Telegram Channel'></Image>
        </div>
      </a>
      <a className='p-4 hover:bg-sky-700' target='_blank' rel='noreferrer' href='https://discord.aldea-dao.org'>
        <div style={{ height: '48px' }}>
          <Image src='/Discord-Logo-White.svg' width={48} height={48} alt='Discord Server'></Image>
        </div>
      </a>
      <a className='p-4 hover:bg-sky-700' target='_blank' rel='noreferrer' href='https://github.com/ALDEA-DAO/multisig'>
        <svg className='w-12 fill-white' viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" />
        </svg>
      </a>
    </aside>
  )
}

const TreasuryListing: NextPage<{
  treasury: Treasury
}> = ({ treasury }) => {
  const { name, script } = treasury
  const base64CBOR = encodeCardanoData(script, 'base64')
  return (
    <NavLink
      href={getTreasuriesPath(encodeURIComponent(base64CBOR))}
      onPageClassName='bg-sky-700 font-semibold'
      className='block w-full p-4 truncate hover:bg-sky-700'>
      {name}
    </NavLink>
  )
}

const SecondaryBar: NextPage = () => {
  const treasuries = useLiveQuery(async () => db.treasuries.toArray())

  return (
    <aside className='flex flex-col w-60 bg-sky-800 items-center text-white overflow-y-auto'>
      <div className='w-full bg-sky-900 font-semibold'>
        <NavLink
          href='/treasuries/new'
          onPageClassName='bg-sky-700'
          className='flex w-full p-4 items-center space-x-1 justify-center hover:bg-sky-700'>
          <PlusIcon className='w-4' />
          <span>Tesoro</span>
        </NavLink>
      </div>
      {treasuries && treasuries.map((treasury, index) => <TreasuryListing key={index} treasury={treasury} />)}
    </aside>
  )
}

const CardanoScanLink: NextPage<{
  className?: string
  type: 'transaction'
  id: string
}> = ({ className, children, type, id }) => {
  const [config, _] = useContext(ConfigContext)
  const host = config.isMainnet ? 'https://cardanoscan.io' : 'https://testnet.cardanoscan.io'
  const href = [host, type, id].join('/')
  return <a className={className} href={href} target='_blank' rel='noreferrer'>{children}</a>;
}

const Hero: NextPage<{ className?: string }> = ({ className, children }) => {
  return <div className={'rounded p-4 bg-sky-700 text-white shadow space-y-4 ' + className}>{children}</div>;
}

const Layout: NextPage = ({ children }) => {
  const [config, _] = useContext(ConfigContext)

  return (
    <div className='flex h-screen'>
      <PrimaryBar />
      <SecondaryBar />
      <div className='w-full bg-sky-100 overflow-y-auto'>
        {!config.isMainnet && <div className='p-1 bg-red-900 text-white text-center'>You are using testnet</div>}
        <div className='flex flex-row-reverse'>
          <NotificationCenter className='fixed space-y-2 w-1/4' />
        </div>
        <div className='p-2 h-screen'>
          {children}
        </div>
      </div>
    </div>
  )
}

export { Layout, Panel, Toggle, Hero, BackButton, CardanoScanLink, CopyButton, ShareCurrentURLButton }
