
import { useNameContext } from '@/context/DataContext';
// import FooterComponent from '@/components/NavbarComponent'
// import { useRouter } from 'next/navigation';
import React from 'react'

const HomePage = () => {
  //using router to display page to style
  // const router = useRouter();
  // router.push('/ItinerarySuggestionPages/AddSuggestionPage');


  // Shitf this stuff to a client component so the page can remain a server
  // there is an extra folder inside components for whole pages
  //if you have questions about this come ask me ~Kass
  const {name}=useNameContext();

  return (
    <div className='bg-gray-500 h-screen'>
      <p>Homepage{name}, welcome </p>
    </div>
  )
}

export default HomePage
