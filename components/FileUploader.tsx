"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
// dropzone imports
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

// current component ⚛️
const FileUploader = ({
  files,
  onChange,
}: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0
        ? (
          <Image
            src={convertFileToUrl(files[0])}
            alt="upload file icon"
            height={1000}
            width={1000}
            className="max-h-[400px] overflow-hidden object-cover"
          />
        )
        : (
          <>
            <Image
              src="/assets/icons/upload.svg"
              alt="upload icon"
              height={40}
              width={40}
            />
            <div className="file-upload_label">
              <p className="text-14-regular">
                <span className="text-green-500">Click to Uplaod</span>
                {" | "}
                Or drag & drop files here
              </p>
              <p>
                SVG, PNG, JPG or JPEG (max 800x400)
              </p>
            </div>
          </>
        )}
    </div>
  );
};

export default FileUploader;
