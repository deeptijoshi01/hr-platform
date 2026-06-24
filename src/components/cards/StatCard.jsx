const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <p className="text-slate-400 text-sm">{title}</p>

      <h3 className="text-3xl font-bold text-white mt-2">
        {value}
      </h3>

      <p className="text-sm text-slate-500 mt-2">
        {subtitle}
      </p>
    </div>
  );
};

export default StatCard;