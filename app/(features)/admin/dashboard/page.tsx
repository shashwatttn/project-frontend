"use client";

const Dashboard = () => {




  return (
    <div className="border rounded-2xl border-amber-50 min-w-dvw min-h-dvh m-4 p-6">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="stat-card">
            <div className={`h-10 w-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="text-xl font-bold mt-1">{value}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Dashboard;
