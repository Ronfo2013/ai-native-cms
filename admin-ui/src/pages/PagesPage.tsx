import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export function PagesPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Pages</h1>
        <Link
          to="/pages/new"
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus size={20} />
          New Page
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-500">No pages yet. Create your first page!</p>
        </div>
      </div>
    </div>
  );
}
