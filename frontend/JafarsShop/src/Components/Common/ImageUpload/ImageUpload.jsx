// ImageUpload.jsx
// Drag‑and‑drop image uploader with preview grid. Supports up to 5 images.
import React, { useRef, useState, useEffect } from 'react';
import './ImageUpload.css';

/**
 * ImageUpload component used in the shop signup flow.
 * @param {object} props
 * @param {string} props.id - unique identifier for the input.
 * @param {string} props.label - field label.
 * @param {File[]} props.initialFiles - optionally pre‑loaded files (e.g., when navigating back).
 * @param {(files: File[])=>void} props.onChange - callback with updated file list.
 * @param {number} [props.maxFiles=5] - maximum number of images allowed.
 * @param {string} [props.error] - validation error message.
 * @param {boolean} [props.required] - show required asterisk.
 */
export default function ImageUpload({
  id,
  label,
  initialFiles = [],
  onChange,
  maxFiles = 5,
  error,
  required = false,
}) {
  const [files, setFiles] = useState(initialFiles);
  const inputRef = useRef(null);

  // Generate preview URLs for display.
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    // Revoke object URLs on cleanup to avoid memory leaks.
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  // Communicate changes upwards.
  useEffect(() => {
    if (onChange) onChange(files);
  }, [files, onChange]);

  const handleFilesSelected = (selected) => {
    const newFiles = Array.from(selected).filter((f) => f.type.startsWith('image/'));
    const combined = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(combined);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
  };

  return (
    <div className={`image-upload ${error ? 'has-error' : ''}`}> 
      <label htmlFor={id} className="image-upload__label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      <div
        className="image-upload__dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        <p>Drag & drop images here or click to select (max {maxFiles})</p>
        <input
          id={id}
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={(e) => handleFilesSelected(e.target.files)}
        />
      </div>
      {previews.length > 0 && (
        <div className="image-upload__preview-grid">
          {previews.map((src, idx) => (
            <div key={idx} className="image-upload__preview-item">
              <img src={src} alt={`preview-${idx}`} />
              <button
                type="button"
                className="image-upload__remove"
                onClick={() => removeFile(idx)}
                aria-label={`Remove image ${idx + 1}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      {error && (
        <p className="image-upload__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
