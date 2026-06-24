const PageHeader = ({ title, subtitle, buttonText }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-slate-400 mt-1">{subtitle}</p>
      </div>

      {buttonText && (
        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white">
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PageHeader;