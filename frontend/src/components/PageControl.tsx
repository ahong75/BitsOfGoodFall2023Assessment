type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (newPage: number) => void
}
function PageControl({ currentPage, totalPages, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      
      <button 
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition duration-200 ease-in-out disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button 
          key={i + 1} 
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-2 rounded transition duration-200 ease-in-out ${currentPage === (i + 1) ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
        >
          {i + 1}
        </button>
      ))}

      <button 
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition duration-200 ease-in-out disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      
    </div>
  );
}
export default PageControl
