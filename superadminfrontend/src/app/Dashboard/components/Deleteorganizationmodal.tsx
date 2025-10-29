'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useEffect } from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  organizationName: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  organizationName,
}: DeleteConfirmModalProps) {
  // Close on "Escape" key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100 hover:scale-[1.01]">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" aria-hidden />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Delete Organization</h3>
              <p className="text-gray-400 text-sm break-words">
                Are you sure you want to delete{' '}
                <span className="text-white font-semibold">{organizationName}</span>? This
                action cannot be undone and will also remove any assigned admin.
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all font-medium shadow-lg shadow-red-500/30"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
