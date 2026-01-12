import { FileText, File, Users, Sparkles } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Posts"
          value="24"
          icon={<FileText className="w-8 h-8 text-blue-600" />}
          trend="+12% this week"
        />
        <StatCard
          title="Pages"
          value="8"
          icon={<File className="w-8 h-8 text-green-600" />}
          trend="+2 this week"
        />
        <StatCard
          title="Users"
          value="5"
          icon={<Users className="w-8 h-8 text-purple-600" />}
          trend="Active"
        />
        <StatCard
          title="AI Generations"
          value="156"
          icon={<Sparkles className="w-8 h-8 text-yellow-600" />}
          trend="+45% this week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          <p className="text-gray-500">No posts yet</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">AI Activity</h2>
          <p className="text-gray-500">No AI activity yet</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-sm text-gray-500">{trend}</p>
    </div>
  );
}
