const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPickups.tsx', 'utf8');

const fetchBlock = `  async function fetchPickups() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setData(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }`;

const newFetchBlock = `  async function fetchPickups() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const localData = JSON.parse(localStorage.getItem('anonymous_requests') || '[]');
      const combined = [...(data || []), ...localData].sort((a, b) => new Date(b.created_at || b.date).getTime() - new Date(a.created_at || a.date).getTime());
      
      setData(combined);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }`;

code = code.replace(fetchBlock, newFetchBlock);
fs.writeFileSync('src/pages/AdminPickups.tsx', code);
