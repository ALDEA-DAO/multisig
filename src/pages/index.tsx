import type { NextPage } from 'next'
import Link from 'next/link'
import { Layout, Panel } from '../components/layout'
import { WalletInfo } from '../components/transaction'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className='space-y-2'>
        <Panel className='p-4 space-y-2'>
          <h1 className='text-lg font-semibold'>ALDEA Tesoro</h1>
          <p>Soportamos, por el momento, las wallets Nami, Eternl/cc, Gero y Flint para firmar transacciones. Estamos trabajando para incluir Game Changer.</p>
          <br />
          <p>Comienza a administrar un Tesoro en Cardano con tus amigos y familiares hoy mismo.</p>
          <ul className='flex flex-wrap space-x-2'>
            <WalletInfo className='flex border rounded p-2 space-x-2 items-center w-48 shadow' name='nami' src='/nami.svg'>Nami Wallet</WalletInfo>
            <WalletInfo className='flex border rounded p-2 space-x-2 items-center w-48 shadow' name='eternl' src='/eternl.png'>Eternl/cc Wallet</WalletInfo>
            <WalletInfo className='flex border rounded p-2 space-x-2 items-center w-48 shadow' name='gero' src='https://gerowallet.io/assets/img/logo2.ico'>Gero Wallet</WalletInfo>
          </ul>
          <br />
          <p>ALDEA tiene una comunidad excepcional. Si tienes preguntas o problemas, acércate a nosotros a través de <a className='text-sky-700' target='_blank' rel='noreferrer' href='https://discord.aldea-dao.org'>Discord</a> o <a className='text-sky-700' target='_blank' rel='noreferrer' href='https://fogon.aldea-dao.org'>Telegram</a>.</p>
        </Panel>
      </div>
    </Layout>
  )
}

export default Home
