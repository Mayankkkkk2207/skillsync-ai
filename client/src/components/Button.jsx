export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium"
    >
      {children}
    </button>
  );
}

