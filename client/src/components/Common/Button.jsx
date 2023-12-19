const Button = ({ type = 'button', loading = false, className, ...props }) => (
  <button
    type={type}
    {...(loading && { disabled: true })}
    className={`${className} inline-flex items-center px-4 
    py-2 bg-gray-800 border border-transparent rounded-md font-semibold
     text-xs text-white uppercase tracking-widest hover:bg-gray-700
      active:bg-gray-900 focus:outline-none focus:border-gray-900 
      focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
    {...props}
  >
    {loading ? (
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4a7.963 7.963 0 01-6-2.709z"
        ></path>
      </svg>
    ) : null}
    {props.children}
  </button>
);

export default Button;
