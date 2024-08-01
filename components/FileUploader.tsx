"use client"
import React, {useCallback} from 'react';
import { convertFileToUrl } from '@/lib/utils';
import Image from 'next/image';
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
    files: File[] | undefined;
    onChange: (files: File[]) => void; 
}

const FileUploader = ({files, onChange}: FileUploaderProps) => {
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="file-upload"
    >
      <input {...getInputProps} className="hidden" />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          className="max-h-[400px] overflow-hidden object-cover"
          alt="uploaded image"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            height={40}
            width={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500 mr-1">Click to upload</span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default FileUploader