import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RequestData {
  id: string;
  status: string;
  type: string;
  date: string;
}

export function ActiveRequests() {
  const [data, setData] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchRequests() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('requests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setData(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [user]);

  return (
    <div className="bg-brand-secondary p-8 lg:p-10 rounded shadow-lg h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-brand-text">Recent Activity</h2>
        <Link to="/history" className="text-[#8CC63F] hover:text-brand-text transition-colors text-sm font-medium">View All</Link>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-brand-text-muted">Loading activity...</div>
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center text-red-500 gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        ) : data.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-brand-text-muted">
            <p>No recent activity found.</p>
          </div>
        ) : (
          data.map(req => (
            <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-brand-primary rounded border border-brand-border hover:border-[#8CC63F]/30 transition-colors cursor-pointer">
              <div>
                <div className="text-brand-text font-medium text-lg">{req.type}</div>
                <div className="text-brand-text-muted text-sm mt-1">ID: #{req.id.slice(0, 6)} • {new Date(req.date).toLocaleDateString()}</div>
              </div>
              
              <div className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${
                req.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 
                req.status === 'Completed' ? 'bg-brand-text/10 text-brand-text/80' :
                'bg-[#8CC63F]/10 text-[#8CC63F]'
              }`}>
                {req.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
