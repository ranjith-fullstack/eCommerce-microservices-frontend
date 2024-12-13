import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = true,
  error = '',
  placeholder = ''
}) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`
          block w-full px-4 py-3 rounded-lg
          border-2 bg-gray-50
          transition-colors duration-200
          focus:bg-white focus:outline-none focus:ring-2
          ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
          }
        `}
      />
      {error && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
        </div>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}