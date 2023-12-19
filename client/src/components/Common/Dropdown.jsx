import { useState } from 'react';

const Dropdown = ({
  align = 'right',
  width = 48,
  contentClasses = 'py-1 bg-white',
  trigger,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  let alignmentClasses;

  switch (width) {
    case '48':
      width = 'w-48';
      break;
    default:
      break;
  }

  switch (align) {
    case 'left':
      alignmentClasses = 'origin-top-left left-0';
      break;
    case 'top':
      alignmentClasses = 'origin-top';
      break;
    case 'right':
    default:
      alignmentClasses = 'origin-top-right right-0';
      break;
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>{trigger}</button>
      {isOpen && (
        <div className={`absolute z-50 mt-2 ${width} rounded-md shadow-lg ${alignmentClasses}`}>
          <div className={`rounded-md focus:outline-none ring-1 ring-black ring-opacity-5 ${contentClasses}`}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
