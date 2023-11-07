import NextLogo from './NextLogo'
import SupabaseLogo from './SupabaseLogo'

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Welcome to the Tarot Reading App! 
      </p>      
      <p className="text-2xl lg:text-3xl !leading-tight mx-auto max-w-xl text-center">
        Feel free to concentrate on your question, and when you're ready, 
        hit 
        {' '}
        <a
          href="/spread"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
        'Start Reading' 
        </a>{' '}
        to begin your Tarot journey. 
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  )
}
