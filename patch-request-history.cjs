const fs = require('fs');
let reqForm = fs.readFileSync('src/components/RequestForm.tsx', 'utf8');

const insertBlock = `      // In a real app we would save to Supabase here if user is logged in
      if (user) {
        const { error } = await supabase.from("requests").insert([
          {
            id: generatedId,
            user_id: user.id,
            type: selectedService,
            status: "Pending",
            date: date,
            address: address,
            points: 0,
          },
        ]);

        if (error) {
          throw error;
        }
      }`;

const newInsertBlock = `      const newRequest = {
        id: generatedId,
        user_id: user?.id || 'anonymous',
        type: selectedService,
        status: "Pending",
        date: date,
        address: address,
        points: 0,
        created_at: new Date().toISOString()
      };

      if (user) {
        const { error } = await supabase.from("requests").insert([newRequest]);
        if (error) throw error;
      } else {
        const existing = JSON.parse(localStorage.getItem('anonymous_requests') || '[]');
        existing.push(newRequest);
        localStorage.setItem('anonymous_requests', JSON.stringify(existing));
      }`;

reqForm = reqForm.replace(insertBlock, newInsertBlock);
fs.writeFileSync('src/components/RequestForm.tsx', reqForm);

let history = fs.readFileSync('src/pages/History.tsx', 'utf8');

const fetchBlock = `    async function fetchHistory() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("requests")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setData(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }`;

const newFetchBlock = `    async function fetchHistory() {
      let supabaseData: RequestData[] = [];
      if (user) {
        try {
          const { data, error } = await supabase
            .from("requests")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (error) throw error;
          supabaseData = data || [];
        } catch (err: any) {
          setError(err.message);
        }
      }
      
      const localData = JSON.parse(localStorage.getItem('anonymous_requests') || '[]');
      const combined = [...supabaseData, ...localData].sort((a, b) => new Date(b.created_at || b.date).getTime() - new Date(a.created_at || a.date).getTime());
      
      setData(combined);
      setLoading(false);
    }`;

history = history.replace(fetchBlock, newFetchBlock);
fs.writeFileSync('src/pages/History.tsx', history);
