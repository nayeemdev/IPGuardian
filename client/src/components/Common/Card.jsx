const Card = ({children}) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-200">
        <div className="w-full sm:max-w-md mt-6 px-6 py-6 bg-white shadow overflow-hidden sm:rounded-lg">
            {children}
        </div>
    </div>
)

export default Card
