type Props = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-2">
        Overnight Intelligence Dashboard
      </h1>

      <p className="text-gray-600 mb-6">
        AI is analyzing overnight activity to generate insights...
      </p>

      {children}
    </div>
  );
};

export default Dashboard;