import React, { useEffect } from 'react';

import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';

import avatar from '../data/avatar.jpg';

// Template for navbar buttons
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize, currentColor } = useStateContext();

  // Hide/Show Sidebar 
  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  // Checking the screen size changes
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    //Adding eventlistener to setScreenSize whenever screen size changes
    window.addEventListener('resize', handleResize);
    
    //Calling handleResize only once, when the page loads []
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adapting the menu to screen size
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize])

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>

      {/* Hide/Show Sidebar */}
     <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />

     <div className='flex'>

        {/* Cart button */}
        <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart />} />
        
        {/* Chat button */}
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
        
        {/* Notifications button */}
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
    
        {/* Profile button */}
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            {/* Image */}
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />

            {/* Text */}
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Etele
              </span>
            </p>

            {/* Arrow down */}
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.cart && (<Cart />)}
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}

     </div>
    </div>
  )
}

export default Navbar