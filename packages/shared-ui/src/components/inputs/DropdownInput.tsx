import { DocumentUpload } from 'iconsax-reactjs';
import { useDropzone } from 'react-dropzone';


interface DropdownInputProps {
   onDrop: (acceptedFiles: File[]) => void;
}
const DropdownInput = ({ onDrop }: DropdownInputProps) => {

   const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop });
   return (
      <div
         {...getRootProps()}
         className='flex flex-col items-center justify-center gap-2 w-full border-dashed border-2 h-50 p-3 rounded-md bg-gray-50 shadow-sm hover:border-success'>
         <DocumentUpload variant='Bold' size={32} color='#0891b2' />
         {acceptedFiles.length > 0 ? <p className='text-md font-sans text-gray-500 font-normal'>{acceptedFiles[0].name}</p> : <p className='text-md font-sans text-gray-500 font-normal'>Drop your file here or click to select the file you want to upload.</p>}
         <input className='w-full border' type="file" {...getInputProps()} />
      </div>
   )
}

export default DropdownInput